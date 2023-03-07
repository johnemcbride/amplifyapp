import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

export default function Header({ groups }) {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          <Link color="text.primary" href="/" sx={{ my: 1, mx: 1.5 }}>
            East London Community Band
          </Link>
        </Typography>

        <nav>
          {groups.includes("Admin") ? (
            <Link
              variant="button"
              color="text.primary"
              href="/admin"
              sx={{ my: 1, mx: 1.5 }}
            >
              Admin
            </Link>
          ) : null}
          <Link
            variant="button"
            color="text.primary"
            href="/profile"
            sx={{ my: 1, mx: 1.5 }}
          >
            Profile
          </Link>
        </nav>
        <Button href="/signout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
