let statisticsHTML = () => `
   <div>statistics</div>
   <select onchange="" name="cars" id="cars">
       <option value="Top5">${model.statistics.type[0]}</option>
       <option value="Graph">${model.statistics.type[1]}</option>
   </select>
   `;
