import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import ExifParser from "exif-parser";

const app = express();

const directoryPath = "ooo_images_metadata_edit/";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname)));

app.get("/api/photos", async (req, res) => {
  const imageExtensions = [".jpg", ".jpeg", ".png"];

  fs.readdir(directoryPath, async (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading folder");
    }

    const imageFiles = files.filter((file) => {
      const extension = file.substring(file.lastIndexOf(".")).toLowerCase();
      return imageExtensions.includes(extension);
    });

    const allImgMetaData = await imageFiles.map((file) => {
      const filePath = `${directoryPath}/${file}`;
      const buffer = fs.readFileSync(filePath);
      const parser = ExifParser.create(buffer);
      const exifData = parser.parse();
      const groupTitle =
        exifData.tags.ImageDescription?.split(",")[0].split("(")[0];
      const imageTitle = exifData.tags.ImageDescription?.split(",")[0];
      return {
        ...exifData,
        groupTitle,
        imageTitle,
        url: `http://localhost:5000/${directoryPath.concat(file)}`,
      };
    });

    res.json(allImgMetaData);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
