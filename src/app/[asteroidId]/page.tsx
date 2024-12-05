import {fetchAsteroidDetail} from "@/utils/fetch-asteroid-detail";
import {Grid} from "@/components/grid";
import {H1, H3, P} from "@/components/typography";
import cn from "classnames";
import {Button} from "@/components/button";
import Link from "next/link";
import React from "react";

export default async function AsteroidDetailPage({params}: { params: Promise<{ asteroidId: string }> }) {
  const {asteroidId} = await params;
  let asteroidDetail;
  try {
    asteroidDetail = await fetchAsteroidDetail(asteroidId);
  } catch (error) {
    console.error(error);
  }
  if (!asteroidDetail) {
    return (
      <Grid>
        <main
          className={cn(
            "col-span-full",
            "flex flex-col justify-center items-center",
            "py-8"
          )}
        >
          <H3 className={"mb-4"}>Failed to load asteroid detail</H3>
          <Link href={"/"}>
            <Button>Go to home</Button>
          </Link>
        </main>
      </Grid>
    );
  }

  return (
    <Grid>
      <main
        className={cn(
          "col-span-full",
          "flex flex-col justify-center items-center",
          "py-8"
        )}
      >
        <H1 className={cn("col-span-full text-center", "mb-8")}>
          Asteroid {asteroidDetail.name}
        </H1>
        <P>
          <strong>{asteroidDetail.name}</strong> is large
          between <strong>{asteroidDetail.estimated_diameter.kilometers.estimated_diameter_min}km</strong> and{" "}
          <strong>{asteroidDetail.estimated_diameter.kilometers.estimated_diameter_min}km</strong>
        </P>


      </main>
    </Grid>
  )
}
