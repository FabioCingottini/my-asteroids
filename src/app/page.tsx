import React from "react";
import {H1} from "@/components/typography";
import {ClientRenderedPart} from "@/components/client-rendered-part";
import {Grid} from "@/components/grid";
import cn from "classnames";

export default async function Home() {

  return (
    <main
      className="font-[family-name:var(--font-geist-sans)] py-8"
    >
      <Grid>
        <H1 className={cn("col-span-full text-center", "mb-8")}>
          Welcome to My Asteroids App
        </H1>
      </Grid>
      <ClientRenderedPart />
    </main>
  );
}
