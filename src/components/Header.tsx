import type {FunctionComponent} from "react";
import {Box, Slider} from "@chakra-ui/react";
import "./Header.css";

export const Header: FunctionComponent = () => {
  const marks = [
    { value: 0, label: "1800" },
    { value: 10, label: "" },
    { value: 20, label: "" },
    { value: 30, label: "" },
    { value: 40, label: "" },
    { value: 50, label: "" },
    { value: 60, label: "" },
    { value: 70, label: "" },
    { value: 80, label: "" },
    { value: 90, label: "" },
    { value: 100, label: "2020" },
  ];
  
  return (
    <>
      <Box className="slider-box" bg="white">
        <Slider.Root size={"lg"} width="600px" step={10}>
          <Slider.Label>Period</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
            <Slider.Marks marks={marks}/>
          </Slider.Control>
        </Slider.Root>
      </Box>
      <Box>
      
      </Box>
    </>
  )
}
