import type { AssetsArray } from "@/types/AssetsArray.type";

export default function (FilePath: string, assetsArray: AssetsArray[]) {
  const index = assetsArray.findIndex((i) => {
    return i.FilePath === FilePath;
  });
  assetsArray.splice(index, 1);
}
