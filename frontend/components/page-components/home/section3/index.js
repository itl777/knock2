import { useRef, useState } from "react";
import Card01 from "@/components/UI/cards";
import { Box, Button } from "@mui/joy";

export default function HomeSection3() {
  const data = [
    {
      theme_id: 1,
      branch_name: "台北館",
      theme_img: "/images/UI/cards/theme-img.png",
      theme_name: "尋找失落的寶藏",
      difficulty: "MEDIUM",
      description: "尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功",
      suitable_players: "2-6",
      theme_time: 60,
    },
    {
      theme_id: 2,
      branch_name: "台北館",
      theme_img: "/images/UI/cards/theme-img.png",
      theme_name: "尋找失落的寶藏",
      difficulty: "EASY",
      description: "尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功",
      suitable_players: "2-6",
      theme_time: 60,
    },
    {
      theme_id: 3,
      branch_name: "台北館",
      theme_img: "/images/UI/cards/theme-img.png",
      theme_name: "尋找失落的寶藏",
      difficulty: "HARD",
      description: "尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功",
      suitable_players: "2-6",
      theme_time: 60,
    },
    {
      theme_id: 4,
      branch_name: "台北館",
      theme_img: "/images/UI/cards/theme-img.png",
      theme_name: "尋找失落的寶藏",
      difficulty: "MEDIUM",
      description: "尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功",
      suitable_players: "2-6",
      theme_time: 60,
    },
    {
      theme_id: 5,
      branch_name: "台北館",
      theme_img: "/images/UI/cards/theme-img.png",
      theme_name: "尋找失落的寶藏",
      difficulty: "MEDIUM",
      description: "尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功",
      suitable_players: "2-6",
      theme_time: 60,
    },
    {
      theme_id: 6,
      branch_name: "台北館",
      theme_img: "/images/UI/cards/theme-img.png",
      theme_name: "尋找失落的寶藏",
      difficulty: "MEDIUM",
      description: "尋找失落寶藏的冒險，需要找到所有隱藏的線索才能成功",
      suitable_players: "2-6",
      theme_time: 60,
    },
  ];
  const [cardData, setCardData] = useState(data);

  const asd = () => {
    const newCardData = cardData.slice(1).concat(cardData[0]);
    console.log(newCardData);
    setCardData(newCardData);
  };

  const scrollRef = useRef(null);
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({
      left: scrollOffset,
      behavior: "smooth",
    });
    // asd();
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Button
          variant="solid"
          onClick={() => scroll(-407)}
          sx={{ position: "absolute", left: 0, top: "50%", zIndex: 1 }}
        >
          &lt;
        </Button>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            p: 2,
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              // scrollBehavior: "smooth",
              gap: 4,
            }}
          >
            {cardData.map((v, i) => {
              return (
                <Card01
                  key={v["theme_id"]}
                  branchName={v["branch_name"]}
                  themeImg={v["theme_img"]}
                  themeName={v["theme_name"]}
                  difficulty={v["difficulty"]}
                  description={v["description"]}
                  suitablePlayers={v["suitable_players"]}
                  themeTime={v["theme_time"]}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              // scrollBehavior: "smooth",
              gap: 4,
            }}
          >
            {cardData.map((v, i) => {
              return (
                <Card01
                  key={v["theme_id"]}
                  branchName={v["branch_name"]}
                  themeImg={v["theme_img"]}
                  themeName={v["theme_name"]}
                  difficulty={v["difficulty"]}
                  description={v["description"]}
                  suitablePlayers={v["suitable_players"]}
                  themeTime={v["theme_time"]}
                />
              );
            })}
          </Box>
        </Box>
        <Button
          variant="solid"
          onClick={() => scroll(407)}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            zIndex: 1,
          }}
        >
          &gt;
        </Button>
      </Box>
    </>
  );
}
