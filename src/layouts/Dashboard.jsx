import React from "react";
import { Grid } from "semantic-ui-react";
import Categories from "./Categories.jsx";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Categories />
          </Grid.Column>
          <Grid.Column width={12}></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
