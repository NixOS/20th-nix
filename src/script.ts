const NOTION_API_KEY = 'your_notion_api_key';
const DATABASE_ID = 'd0ed8b1060f0421d983646889031e727';

interface Meetup {
  title: string;
  location: string;
  link: string;
}

async function fetchNotionData(): Promise<{ results: Meetup[] }> {
  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'GET',
    headers: {
      //'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-05-13',
    },
  });

  return response.json();
}
function displayMeetups(meetups: Meetup[]): void {
    const meetupsContainer = document.getElementById('meetups');
    meetups.forEach((meetup) => {
      const meetupDiv = document.createElement('div');
      meetupDiv.className = 'meetup bg-white rounded-lg shadow-md p-6';
  
      const meetupTitle = document.createElement('h2');
      meetupTitle.className = 'text-2xl font-semibold mb-3';
      meetupTitle.textContent = meetup.title;
      meetupDiv.appendChild(meetupTitle);
  
      const meetupLocation = document.createElement('p');
      meetupLocation.className = 'mb-3';
      meetupLocation.textContent = `Location: ${meetup.location}`;
      meetupDiv.appendChild(meetupLocation);
  
      const meetupLink = document.createElement('a');
      meetupLink.className = 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700';
      meetupLink.href = meetup.link;
      meetupLink.textContent = 'Meetup Page';
      meetupDiv.appendChild(meetupLink);
  
      meetupsContainer?.appendChild(meetupDiv);
    });
  }

async function init(): Promise<void> {
  const data = await fetchNotionData();
  displayMeetups(data.results);
}

init();
