import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from 'react'
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
  { question: '我有眼睛卻看不見，有翅膀卻飛不動，我是什麼？', answer: '針' },
  { question: '什麼東西，越熱越涼快，越冷越暖和？', answer: '冰箱' },
  { question: '有什麼東西沒人愛吃，卻天天都在吃？', answer: '虧' },
]

const initialState = {
  currentLevel: 1,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  foundDifferences: [],
  solvedRiddles: 0,
  isProcessing: false,
  message: '',
}

const reducer = (state, action) => {
  const ensureArrays = (newState) => ({
    ...newState,
    foundDifferences: Array.isArray(newState.foundDifferences)
      ? newState.foundDifferences
      : [],
  })

  switch (action.type) {
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
      console.log('Before FOUND_DIFFERENCE:', state.foundDifferences)
      console.log('Adding difference:', action.payload)
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
      })
    case 'SET_PROCESSING':
      return ensureArrays({ ...state, isProcessing: action.payload })
    case 'SET_MESSAGE':
      return ensureArrays({ ...state, message: action.payload })
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
    console.log('Initial state:', state)
    const shuffledCards = shuffleArray([...cardImages, ...cardImages])
    const cards = shuffledCards.map((image, index) => ({
      image,
      index,
      flipped: false,
    }))
    dispatch({ type: 'INIT_LEVEL1', payload: cards })
  }, [])

  const checkMatch = useCallback(
    (flippedPair) => {
      const [card1, card2] = flippedPair
      if (card1.image === card2.image) {
        dispatch({ type: 'MATCH_PAIR' })
        if (state.matchedPairs + 1 === 6) {
          dispatch({ type: 'SET_MESSAGE', payload: '恭喜你完成第一關！' })
          setTimeout(() => {
            dispatch({ type: 'NEXT_LEVEL' })
            dispatch({ type: 'SET_MESSAGE', payload: '' })
          }, 2000)
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
          dispatch({ type: 'SET_MESSAGE', payload: '恭喜你完成第二關！' })
          setTimeout(() => {
            dispatch({ type: 'NEXT_LEVEL' })
            dispatch({ type: 'SET_MESSAGE', payload: '' })
          }, 2000)
        }
      }
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
            dispatch({
              type: 'SET_MESSAGE',
              payload: '恭喜你完成第三關，通過所有關卡！',
            })
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

  return (
    <div className="container mt-2 d-block justify-content-center">
      <h1 className={styles.title}>\密室逃脫小遊戲/</h1>
      {state.message && <div className={styles.message}>{state.message}</div>}
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
                <img className={styles.image} src="/game/A.png" alt="圖片1" />
                <img className={styles.image} src="/game/S.png" alt="圖片2" />
                {differences.map((diff, index) => (
                  <button
                    key={index}
                    className={`${styles.difference} ${
                      state.foundDifferences.includes(index) ? styles.found : ''
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
    </div>
  )
}
