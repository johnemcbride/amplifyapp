import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import NewMember from "./NewMember";

export default function Header() {
  return (
    <>
      <Container disableGutters padding="0">
        <Grid
          height="100%"
          container
          spacing={0}
          justifyContent="space-between"
          marginX={0}
          paddingX={0}
        >
          <NewMember />
        </Grid>
      </Container>
    </>
  );
}
