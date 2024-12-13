// fetch and process the data.json
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    startAnimation(data[0]); 
  })
  .catch(error => {
    console.error("Error fetching the JSON data:", error);
  });

function startAnimation(data) {
  const canvas = document.getElementById('canvas');
  const timeline = gsap.timeline();

  canvas.innerHTML = '';

  // part 1: display "LIVE SPORT THIS WEEK"
  const stage1Text = document.createElement('h1');
  stage1Text.textContent = 'LIVE SPORT THIS WEEK';
  stage1Text.style.color = data.theme.colours.primary;
  stage1Text.style.textAlign = 'center';
  canvas.appendChild(stage1Text);
  timeline.fromTo(
    stage1Text,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, repeat: 2, yoyo: true }
  );

  // part 2: "Coogee Bay Hotel"
  timeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    
    const logo = document.createElement('img');
    logo.src = data.mainImage; // fetch Coogee Bay Hotel logo URL
    logo.alt = 'Coogee Bay Hotel Logo';
    logo.style.width = '200px';
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
      const teamContainer = document.createElement('div');
      teamContainer.style.display = 'flex';
      teamContainer.style.justifyContent = 'space-between';
      teamContainer.style.alignItems = 'center';
      teamContainer.style.width = '80%';
      teamContainer.style.margin = '0 auto';

      // team 1 logo
      const team1 = createTeamElement(event.playerTeam1Name, event.playerTeam1Image);
      teamContainer.appendChild(team1);

      const centerText = document.createElement('h2');
      centerText.textContent = `${event.playerTeam1Name} v ${event.playerTeam2Name}`;
      centerText.style.textAlign = 'center';
      centerText.style.color = data.theme.colours.textPrimary;
      teamContainer.appendChild(centerText);

      // team 2 logo
      const team2 = createTeamElement(event.playerTeam2Name, event.playerTeam2Image);
      teamContainer.appendChild(team2);

      canvas.appendChild(teamContainer);

      // add event time text below
      const timeText = document.createElement('h3');
      timeText.textContent = `${event.startTime}`;
      timeText.style.color = data.theme.colours.textSecondary;
      timeText.style.textAlign = 'center';
      timeText.style.marginTop = '20px';
      canvas.appendChild(timeText);
    });

    // animations for teams and center text
    timeline.from('h2', { scale: 0, opacity: 0, duration: 0.5 });
    timeline.from('h3', { y: 50, opacity: 0, duration: 0.5 });
    timeline.from('.team img', { scale: 0, opacity: 0, stagger: 0.3, duration: 0.5 });
  });
}

// helper function to create team elements
function createTeamElement(teamName, teamImage) {
  const teamDiv = document.createElement('div');
  teamDiv.className = 'team';
  teamDiv.style.textAlign = 'center';

  const img = document.createElement('img');
  img.src = teamImage;
  img.alt = teamName;
  img.style.width = '80px';
  img.style.height = '80px';
  img.style.borderRadius = '50%';
  teamDiv.appendChild(img);

  const name = document.createElement('p');
  name.textContent = teamName;
  name.style.marginTop = '10px';
  name.style.fontSize = '0.9rem';
  name.style.fontWeight = 'bold';
  teamDiv.appendChild(name);

  return teamDiv;
}
