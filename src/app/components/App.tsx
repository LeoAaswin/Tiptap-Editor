'use client';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  type PaletteMode,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import Editor from "./Editor";

export default function App() {
  const [paletteMode, setPaletteMode] = useState<PaletteMode>('light'); // Default to light mode

  // Effect to check system settings and set the initial palette mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setPaletteMode(prefersDarkMode ? "dark" : "light");
  }, []); // Run once on mount

  const togglePaletteMode = useCallback(
    () =>
      setPaletteMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          secondary: {
            main: "#42B81A",
          },
        },
      }),
    [paletteMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            mui-tiptap
          </Typography>

          <IconButton onClick={togglePaletteMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, maxWidth: 1207, margin: "0 auto" }}>
        <Editor />
      </Box>
    </ThemeProvider>
  );
}
