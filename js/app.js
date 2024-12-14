// fetch and process the data.json
fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    animateContent(data[0]); // use the first venue data
  })
  .catch(error => {
    console.error("Error fetching the JSON data:", error);
  });

function animateContent(data) {
  const canvas = document.getElementById('canvas');
  const timeline = gsap.timeline({ repeat: -1 }); // loop animations

  canvas.innerHTML = '';

  // part 1: display "LIVE SPORT THIS WEEK"
  timeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    container.style.backgroundColor = data.theme.colours.primary; // set background color for the container
    container.style.padding = '20px';
    container.style.borderRadius = '10px'; // set rounded corners
    container.style.height = '300px'; // fixed height
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';

    const liveSportText = document.createElement('h1');
    liveSportText.textContent = 'LIVE SPORT THIS WEEK';
    liveSportText.style.color = data.theme.colours.textPrimary;
    liveSportText.style.textAlign = 'center';
    liveSportText.style.fontFamily = 'Geogrotesque-Bold';
    
    container.appendChild(liveSportText);
    canvas.appendChild(container);
  });
  timeline.fromTo(
    'h1',
    { opacity: 0, scale: 0.8, rotate: -10 },
    { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'power3.out' }
  );
  timeline.to('h1', { opacity: 0, scale: 0.8, duration: 0.5, delay: 0.5 });

  // part 2: "Coogee Bay Hotel"
  timeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    container.style.backgroundColor = data.theme.colours.primary; // set background color for the container
    container.style.padding = '20px';
    container.style.borderRadius = '10px'; // set rounded corners
    container.style.height = '300px'; // fixed height
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    
    const logo = document.createElement('img');
    logo.src = data.mainImage; // fetch Coogee Bay Hotel logo URL
    logo.alt = 'Coogee Bay Hotel Logo';
    logo.style.width = '400px';
    logo.style.height = 'auto';
    logo.style.margin = '0 auto';
    logo.style.display = 'block';
    
    container.appendChild(logo);
    canvas.appendChild(container);
  });
  timeline.fromTo(
    'img',
    { opacity: 0, scale: 0.8, y: 50 },
    { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
  );

  // part 3: loop through "thisWeek" events
  data.thisWeek.forEach((event, index) => {
    timeline.call(() => {
      canvas.innerHTML = '';
      const eventContainer = document.createElement('div');
      eventContainer.style.backgroundColor = data.theme.colours.primary; // set background color for event container
      eventContainer.style.padding = '20px';
      eventContainer.style.borderRadius = '10px'; // set rounded corners
      eventContainer.style.height = '300px'; // fixed height
      eventContainer.style.display = 'flex';
      eventContainer.style.alignItems = 'center';
      eventContainer.style.justifyContent = 'center';

      // team 1 logo
      const team1Logo = createTeamLogo(event.playerTeam1Image, event.playerTeam1Name);
      eventContainer.appendChild(team1Logo);

      const matchInfo = document.createElement('h3');
      matchInfo.textContent = event.title;
      matchInfo.style.color = data.theme.colours.textPrimary;
      matchInfo.style.fontFamily = 'Geogrotesque-SemiBold';
      matchInfo.style.textAlign = 'center';
      matchInfo.style.flex = '1';
      matchInfo.className = 'centerText';
      eventContainer.appendChild(matchInfo);

      // team 2 logo
      const team2Logo = createTeamLogo(event.playerTeam2Image, event.playerTeam2Name);
      eventContainer.appendChild(team2Logo);

      canvas.appendChild(eventContainer);
    }); 

    // animate team logos
    timeline.from('.teamLogo', { opacity: 0, x: index % 2 === 0 ? -200 : 200, duration: 1, ease: 'power3.out' });

    // animate match info text
    timeline.fromTo(
      '.centerText',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' },
      '<'
    );

    // replace match info with start time
    timeline.call(() => {
      const matchInfo = document.querySelector('.centerText');
      matchInfo.textContent = event.startTime;
      matchInfo.style.color = data.theme.colours.textPrimary;
    });
    timeline.fromTo(
      '.centerText',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' },
      '<'
    );

    // transition to the next event
    timeline.to('.teamLogo, .centerText', { opacity: 0, duration: 0.5, delay: 0.5 });
  });
}

// helper function to create team logos with their names
function createTeamLogo(imageSrc, teamName) {
  // create a container div for team logo
  const teamContainer = document.createElement('div');
  teamContainer.className = 'teamLogoContainer';
  teamContainer.style.display = 'flex';
  teamContainer.style.flexDirection = 'column';
  teamContainer.style.alignItems = 'center';
  teamContainer.style.margin = '10px';

  // create the logo element
  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = `${teamName} Logo`;
  img.className = 'teamLogo';
  img.style.width = '100px';
  img.style.height = '100px';
  img.style.borderRadius = '50%';
  img.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)';
  
  // create the team name element
  const name = document.createElement('span');
  name.className = 'teamName';
  name.textContent = teamName;
  name.style.marginTop = '10px';
  name.style.fontSize = '20px';
  name.style.fontWeight = 'bold';
  name.style.textAlign = 'center';

  // append logo and name to the container to display
  teamContainer.appendChild(img);
  teamContainer.appendChild(name);

  return teamContainer;
}
