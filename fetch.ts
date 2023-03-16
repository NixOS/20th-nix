import { Client } from "@notionhq/client";
import fs from "fs";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

interface Meetup {
  Name: string;
  "Country/City": string;
  Link: string;
  Date: string;
}

async function fetchDatabase(databaseId: string): Promise<Meetup[]> {
  const response = await notion.databases.query({ database_id: databaseId });

  const items = response.results.filter((item: any) => item.properties.Approved.checkbox == true).map((item: any) => {
    return {
        Name: item.properties.Name.title[0]?.text.content || "",
        "Country/City": item.properties["Country/City"].rich_text[0]?.text.content || "",
        Link: item.properties.Link.url || "",
        Date: item.properties.Date.date?.start || "",
      };
  });

  return items;
}

async function main() {
  const databaseId = process.env.DATABASE_ID || "";
  const items = await fetchDatabase(databaseId);

  items.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

  fs.writeFileSync("src/meetups.json", JSON.stringify(items, null, 2));
  console.log("Data saved to src/meetups.json.");
}

main().catch(console.error);
