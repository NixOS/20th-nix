const fetchJSON = async (): Promise<any[]> => {
    try {
      const response = await fetch('/meetups.json');
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };  

  const jsonToTable = (json: any[]): HTMLTableElement => {
    const table = document.createElement('table');
    table.classList.add(
      'w-full',
      'table-auto',
      'divide-y',
      'divide-gray-200',
      'shadow-md',
      'rounded-lg',
      'm-4',
      'mb-24'
    );
  
    // Create table header
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    for (const column of Object.keys(json[0])) {
      if (column !== 'Link') {
        const th = document.createElement('th');
        th.textContent = column;
        th.classList.add(
          'px-8',
          'py-8',
          'text-left',
          'text-xs',
          'font-semibold',
          'text-white',
          'text-center',
          'uppercase',
          'tracking-wider'
        );
        headerRow.appendChild(th);
      }
    }
  
    // Create table body
    const tbody = table.createTBody();
    for (const record of json) {
      const row = tbody.insertRow();
      for (const column of Object.keys(record)) {
        if (column !== 'Link') {
          const cell = row.insertCell();
          if (column === 'Name') {
            const link = document.createElement('a');
            link.href = record.Link;
            link.textContent = record[column];
            link.classList.add('text-white', 'hover:underline');
            cell.appendChild(link);
          } else {
            cell.textContent = record[column];
          }
          cell.classList.add('px-8', 'py-5', 'whitespace-nowrap', 'text-sm', 'text-white');
        }
      }
    }
  
    return table;
  };
  
const displayTable = async () => {
  const json = await fetchJSON();
  if (json.length) {
    const table = jsonToTable(json);
    const tableContainer = document.getElementById('meetups');
    if (tableContainer) {
      tableContainer.appendChild(table);
    }
  }
};

displayTable();
