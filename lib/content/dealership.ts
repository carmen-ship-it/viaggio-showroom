import { cache } from "react";
import type { Dealership } from "@/types/dealership";
import { contentPaths } from "./paths";
import { readJsonFile } from "./loader";
import { validateContent } from "./validator";

export const getDealership = cache((): Dealership => {
  const data = readJsonFile<unknown>(contentPaths.dealership());
  return validateContent<Dealership>(
    "dealership.schema.json",
    data,
    "dealership",
  );
});
