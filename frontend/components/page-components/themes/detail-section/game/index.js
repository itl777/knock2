import React, { useEffect, useCallback, useReducer, useMemo } from 'react'
import styles from './game.module.css'

const cardImages = [
  '/game/01.png',
  '/game/02.png',
  '/game/03.png',
  '/game/04.png',
  '/game/05.png',
  '/game/06.png',
]
const cardBackImage = '/game/card.jpg'

const differences = [
  { x: '18%', y: '10%' },
  { x: '40%', y: '92%' },
  { x: '42%', y: '10%' },
  { x: '80%', y: '80%' },
  { x: '50%', y: '36%' },
]

const riddles = [
  { question: '什麼東西在桌上可以看到，卻永遠無法使用？', answer: '影子' },
  {
    question: '每一天都帶來光明和溫暖，但你永遠無法直視他？',
    answer: '太陽',
  },
  { question: '什麼東西能打開所有鎖，但自己卻永遠關不上？', answer: '鑰匙' },
]

const initialState = {
  gameStarted: false,
  currentLevel: 0,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  foundDifferences: [],
  solvedRiddles: 0,
  isProcessing: false,
  message: '',
  showLevelComplete: false,
  gameCompleted: false,
}

const reducer = (state, action) => {
  const ensureArrays = (newState) => ({
    ...newState,
    foundDifferences: Array.isArray(newState.foundDifferences)
      ? newState.foundDifferences
      : [],
  })

  switch (action.type) {
    case 'START_GAME':
      return ensureArrays({ ...state, gameStarted: true, currentLevel: 1 })
    case 'INIT_LEVEL1':
      return ensureArrays({
        ...state,
        cards: action.payload,
        matchedPairs: 0,
        flippedCards: [],
      })
    case 'FLIP_CARD':
      return ensureArrays({
        ...state,
        cards: action.payload.cards,
        flippedCards: action.payload.flippedCards,
      })
    case 'MATCH_PAIR':
      return ensureArrays({
        ...state,
        matchedPairs: state.matchedPairs + 1,
        flippedCards: [],
      })
    case 'NO_MATCH':
      return ensureArrays({
        ...state,
        cards: action.payload,
        flippedCards: [],
      })
    case 'FOUND_DIFFERENCE':
      return ensureArrays({
        ...state,
        foundDifferences: [...(state.foundDifferences || []), action.payload],
      })
    case 'SOLVE_RIDDLE':
      return ensureArrays({
        ...state,
        solvedRiddles: state.solvedRiddles + 1,
      })
    case 'NEXT_LEVEL':
      return ensureArrays({
        ...state,
        currentLevel: state.currentLevel + 1,
        showLevelComplete: false,
      })
    case 'SET_PROCESSING':
      return ensureArrays({ ...state, isProcessing: action.payload })
    case 'SET_MESSAGE':
      return ensureArrays({ ...state, message: action.payload })
    case 'SHOW_LEVEL_COMPLETE':
      return ensureArrays({ ...state, showLevelComplete: true })
    case 'COMPLETE_GAME':
      return ensureArrays({ ...state, gameCompleted: true })
    case 'RESET_LEVEL2':
      return ensureArrays({
        ...state,
        foundDifferences: [],
      })
    default:
      return ensureArrays(state)
  }
}

const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.currentLevel === 1 && state.cards.length === 0) {
      const shuffledCards = shuffleArray([...cardImages, ...cardImages])
      const cards = shuffledCards.map((image, index) => ({
        image,
        index,
        flipped: false,
      }))
      dispatch({ type: 'INIT_LEVEL1', payload: cards })
    } else if (state.currentLevel === 2) {
      dispatch({ type: 'RESET_LEVEL2' })
    }
  }, [state.currentLevel, state.cards.length])

  const checkMatch = useCallback(
    (flippedPair) => {
      const [card1, card2] = flippedPair
      if (card1.image === card2.image) {
        dispatch({ type: 'MATCH_PAIR' })
        if (state.matchedPairs + 1 === 6) {
          dispatch({ type: 'SHOW_LEVEL_COMPLETE' })
        }
      } else {
        setTimeout(() => {
          const newCards = [...state.cards]
          newCards[card1.index].flipped = false
          newCards[card2.index].flipped = false
          dispatch({ type: 'NO_MATCH', payload: newCards })
        }, 500)
      }
      dispatch({ type: 'SET_PROCESSING', payload: false })
    },
    [state.cards, state.matchedPairs]
  )

  const flipCard = useCallback(
    (index) => {
      if (
        state.isProcessing ||
        state.flippedCards.length >= 2 ||
        state.cards[index].flipped
      )
        return

      dispatch({ type: 'SET_PROCESSING', payload: true })

      const newCards = [...state.cards]
      newCards[index].flipped = true
      const newFlippedCards = [
        ...state.flippedCards,
        { ...newCards[index], index },
      ]

      dispatch({
        type: 'FLIP_CARD',
        payload: { cards: newCards, flippedCards: newFlippedCards },
      })

      if (newFlippedCards.length === 2) {
        setTimeout(() => checkMatch(newFlippedCards), 300)
      } else {
        dispatch({ type: 'SET_PROCESSING', payload: false })
      }
    },
    [state.cards, state.flippedCards, state.isProcessing, checkMatch]
  )

  const handleDifferenceClick = useCallback(
    (index) => {
      if (!Array.isArray(state.foundDifferences)) {
        console.error(
          'foundDifferences is not an array:',
          state.foundDifferences
        )
        dispatch({ type: 'FOUND_DIFFERENCE', payload: index })
        return
      }

      if (!state.foundDifferences.includes(index)) {
        dispatch({ type: 'FOUND_DIFFERENCE', payload: index })
        if (state.foundDifferences.length + 1 === 5) {
          dispatch({ type: 'SHOW_LEVEL_COMPLETE' })
        }
      }
      // 強制更新狀態以觸發重新渲染
      dispatch({ type: 'SET_MESSAGE', payload: '' })
    },
    [state.foundDifferences]
  )

  const checkAnswer = useCallback(
    (index, userAnswer) => {
      if (userAnswer.toLowerCase() === riddles[index].answer.toLowerCase()) {
        dispatch({ type: 'SET_MESSAGE', payload: '回答正確！' })
        dispatch({ type: 'SOLVE_RIDDLE' })
        if (state.solvedRiddles + 1 === riddles.length) {
          setTimeout(() => {
            dispatch({ type: 'COMPLETE_GAME' })
          }, 500)
        } else {
          setTimeout(() => {
            dispatch({ type: 'SET_MESSAGE', payload: '' })
          }, 1000)
        }
      } else {
        dispatch({ type: 'SET_MESSAGE', payload: '回答錯誤，請再試一次。' })
        setTimeout(() => {
          dispatch({ type: 'SET_MESSAGE', payload: '' })
        }, 1000)
      }
    },
    [state.solvedRiddles]
  )

  const cardElements = useMemo(
    () =>
      state.cards.map((card, index) => (
        <div
          key={index}
          className={`${styles.card} ${card.flipped ? styles.cardFlipped : ''}`}
          onClick={() => flipCard(index)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              flipCard(index)
            }
          }}
          tabIndex="0"
          role="button"
          aria-label={`Card ${index + 1}${card.flipped ? ', flipped' : ''}`}
        >
          <div className={styles.cardInner}>
            <div
              className={`${styles.cardFace} ${styles.cardFront}`}
              style={{ backgroundImage: `url(${card.image})` }}
            />
            <div
              className={`${styles.cardFace} ${styles.cardBack}`}
              style={{ backgroundImage: `url(${cardBackImage})` }}
            />
          </div>
        </div>
      )),
    [state.cards, flipCard]
  )

  const IntroScreen = () => (
    <div className="container">
      <h1 className={styles.title}>\密室逃脫小遊戲/</h1>
      <div className={styles.introScreen}>
        <img src="/game/intro.png" alt="Intro" className={styles.introImage} />
        <p className={styles.p}>
          在前往密室逃脫前，玩個小遊戲，
          <br />
          準備好挑戰你的觀察力和智慧了嗎？
        </p>
        <button
          className={styles.startButton}
          onClick={() => dispatch({ type: 'START_GAME' })}
        >
          開始遊戲
        </button>
      </div>
    </div>
  )

  const LevelCompleteScreen = () => (
    <div className={styles.levelCompleteScreen}>
      <h2 className={styles.title2}>恭喜完成第{state.currentLevel}關！</h2>
      <div>
        <img
          src={`/game/complete${state.currentLevel}.png`}
          alt={`Level ${state.currentLevel} Complete`}
          className={styles.levelCompleteImage}
        />
      </div>
      <button
        className={styles.nextLevelButton}
        onClick={() => dispatch({ type: 'NEXT_LEVEL' })}
      >
        下一關
      </button>
    </div>
  )

  const GameCompletedScreen = () => (
    <div className={styles.gameCompletedScreen}>
      <h2>恭喜你完成所有關卡！</h2>
      <div className="mt-4">
        <img
          src="/game/complete3.png"
          alt="Game Completed"
          className={styles.gameCompletedImage}
        />
      </div>
      <p>你成功逃出密室了！</p>
    </div>
  )

  return (
    <div className="container mt-2 d-block justify-content-center">
      {!state.gameStarted && <IntroScreen />}
      {state.gameStarted && !state.gameCompleted && (
        <>
          <h1 className={styles.title}>\密室逃脫小遊戲/</h1>
          {state.message && (
            <div className={styles.message}>{state.message}</div>
          )}
          {state.showLevelComplete ? (
            <LevelCompleteScreen />
          ) : (
            <div className={styles.gameContent}>
              {state.currentLevel === 1 && (
                <div className={styles.level}>
                  <h2 className={styles.title2}>第一關：翻牌配對</h2>
                  <div className={styles.cardGrid}>{cardElements}</div>
                </div>
              )}

              {state.currentLevel === 2 && (
                <div className={styles.level}>
                  <h2 className={styles.title2}>第二關：找出不同</h2>
                  <p className={styles.p}>在兩張圖片中找出5處不同之處</p>
                  <div className={styles.imageComparisonContainer}>
                    <div className={styles.imageWrapper}>
                      <img
                        className={styles.image}
                        src="/game/A.png"
                        alt="圖片1"
                      />
                      <img
                        className={styles.image}
                        src="/game/S.png"
                        alt="圖片2"
                      />
                      {differences.map((diff, index) => (
                        <button
                          key={index}
                          className={`${styles.difference} ${
                            state.foundDifferences.includes(index)
                              ? styles.found
                              : ''
                          }`}
                          style={{
                            left: diff.x,
                            top: diff.y,
                          }}
                          onClick={() => handleDifferenceClick(index)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleDifferenceClick(index)
                            }
                          }}
                          tabIndex="0"
                          aria-label={`找不同點 ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                  </div>
                  <p className={styles.p2}>
                    找到的不同：{state.foundDifferences.length}/5
                  </p>
                </div>
              )}

              {state.currentLevel === 3 && (
                <div className={styles.level}>
                  <h2 className={styles.title2}>第三關：謎語遊戲</h2>
                  <p className={styles.p}>回答以下三個謎題以通關：</p>
                  <div className={styles.riddleContainer}>
                    {riddles.map((riddle, index) => (
                      <div key={index} className={styles.riddle}>
                        <p>
                          {index + 1}. {riddle.question}
                        </p>
                        <input
                          type="text"
                          placeholder="請輸入答案"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              checkAnswer(index, e.target.value)
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {state.gameCompleted && <GameCompletedScreen />}
    </div>
  )
}
