import {type ReactNode} from "react";
import {Box} from "@chakra-ui/react";
import "./Layout.css";

export const Layout = ({children}: {children: ReactNode}) => {
  return (
    <Box className="layout">
      {children}
    </Box>
  )
}
