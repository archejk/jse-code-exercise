// fetch and process the data.json
fetch('./data.json').then((response) => response.json()).then((data) => {
    animateContent(data[0]); // use the first venue data
  })
  .catch(error => {
    console.error("Error fetching the JSON data:", error);
  });

function animateContent(data) {
  const canvas = document.getElementById('canvas');
  const gsapTimeline = gsap.timeline({ repeat: -1 }); // loop animations

  canvas.innerHTML = '';

  // part 1: display "LIVE SPORT THIS WEEK" text
  displayLiveSportThisWeekText(data, canvas, gsapTimeline);

  // part 2: Coogee Bay Hotel Logo P1
  displayCogooBayLogoP1(data, canvas, gsapTimeline);

  // part 3: call displayThisWeekEvents function that loops through "thisWeek" events
  displayThisWeekEvents(data, canvas, gsapTimeline);

  // part 4: display "UPCOMING HIGHLIGHTS" text
  displayUpcomingHighlightsText(data, canvas, gsapTimeline);

  // part 5: Coogee Bay Hotel Logo P2
  displayCogooBayLogoP2(data, canvas, gsapTimeline);

  // part 6: call displayUpcomingEvents function that loops through "upcoming" events
  displayUpcomingEvents(data, canvas, gsapTimeline);

  // last part: display Coogee Bay Hotel Logo P3 and SportsYear Logo
  displayEndingLogosWithTransition(data, canvas, gsapTimeline);
}

function displayLiveSportThisWeekText(data, canvas, gsapTimeline) {
  gsapTimeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    container.style.backgroundColor = data.theme.colours.primary;
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.height = '300px';
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

    // split the text into individual span elements for each letter
    const letters = liveSportText.textContent.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      return span;
    });

    liveSportText.textContent = '';
    letters.forEach(letter => liveSportText.appendChild(letter));

    // apply GSAP staggered animation to each letter
    gsap.fromTo(letters, 
      { opacity: 0,
        y: 50,
        rotation: -10
      },
      { opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.02,
        delay: 0.5
      }
    );

    gsap.to(letters,
      {
        opacity: 0,
        y: -50,
        rotation: 10,
        duration: 0.5,
        ease: 'power3.in',
        stagger: 0.02,
        delay: 2,
      }
    );
  });

  gsapTimeline.fromTo(
    'h1',
    { opacity: 0,scale: 0.8,rotate: -10 },
    { opacity: 1,scale: 1,rotate: 0,duration: 1,ease: 'power3.out' }
  );
  gsapTimeline.to('h1',{ opacity: 0,scale: 0.8,duration: 2,delay: 0.5 });
}

function displayCogooBayLogoP1(data, canvas, gsapTimeline) {
  gsapTimeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    container.style.backgroundColor = data.theme.colours.primary;
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.height = '300px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    
    const logo = document.createElement('img');
    logo.src = data.mainImage; // fetch Coogee Bay Hotel logo URL
    logo.alt = data.name;
    logo.style.width = '400px';
    logo.style.height = 'auto';
    logo.style.margin = '0 auto';
    logo.style.display = 'block';

    gsap.fromTo(logo,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    gsap.to(logo, {
      opacity: 0,
      y: -200,
      duration: 1,
      ease: 'power3.in',
      delay: 1,
    });

    container.appendChild(logo);
    canvas.appendChild(container);
  });

  gsapTimeline.fromTo(
    'img',
    { opacity: 0, scale: 0.8, y: 50 },
    { opacity: 1, scale: 1, y: 0, duration: 2, ease: 'power3.out' }
  );
}

function displayThisWeekEvents(data, canvas, gsapTimeline) {
  data.thisWeek.forEach((event, index) => {
    gsapTimeline.call(() => {
      canvas.innerHTML = '';
      const eventContainer = document.createElement('div');
      eventContainer.style.backgroundColor = data.theme.colours.primary;
      eventContainer.style.padding = '20px';
      eventContainer.style.borderRadius = '10px';
      eventContainer.style.height = '300px';
      eventContainer.style.display = 'flex';
      eventContainer.style.alignItems = 'center';
      eventContainer.style.justifyContent = 'center';

      // team 1 logo
      const team1Logo = createTeamLogo(event.playerTeam1Image, event.playerTeam1Name);
      eventContainer.appendChild(team1Logo);

      // container for match details
      const matchDetailsContainer = document.createElement('div');
      matchDetailsContainer.style.display = 'flex';
      matchDetailsContainer.style.flexDirection = 'column';
      matchDetailsContainer.style.alignItems = 'center';
      matchDetailsContainer.style.textAlign = 'center';
      matchDetailsContainer.style.flex = '1';

      // subTitle
      const matchSubTitle = document.createElement('h2');
      matchSubTitle.textContent = event.subTitle;
      matchSubTitle.style.color = data.theme.colours.textPrimary;
      matchSubTitle.style.fontFamily = 'Geogrotesque-Regular';
      matchSubTitle.style.marginBottom = '-32px'; // spacing below subTitle
      matchSubTitle.className = 'centerSubText';

      // title
      const matchInfo = document.createElement('h3');
      matchInfo.textContent = event.title;
      matchInfo.style.color = data.theme.colours.textPrimary;
      matchInfo.style.fontFamily = 'Geogrotesque-SemiBold';
      matchInfo.className = 'centerText';

      // append subTitle and title to match details container
      matchDetailsContainer.appendChild(matchSubTitle);
      matchDetailsContainer.appendChild(matchInfo);

      // add match details container to event container
      eventContainer.appendChild(matchDetailsContainer);

      // team 2 logo
      const team2Logo = createTeamLogo(event.playerTeam2Image, event.playerTeam2Name);
      eventContainer.appendChild(team2Logo);

      canvas.appendChild(eventContainer);
    });

    // animate team logos
    gsapTimeline.from('.teamLogo', { opacity: 0, x: index % 2 === 0 ? -200 : 200, duration: 1, ease: 'power3.out' });

    gsapTimeline.fromTo(
      '.centerText',
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: 'power3.out' },
      '<'
    );

    // replace match info (title and subTitle) with startTime
    gsapTimeline.call(() => {
      const matchInfo = document.querySelector('.centerText');
      const matchSubTitle = document.querySelector('.centerSubText');
      const startTime = event.startTime;
    
      if (matchInfo) {
        matchInfo.textContent = "";
      }

      if (matchSubTitle) {
        matchSubTitle.style.backgroundColor = data.theme.colours.secondary;
        matchSubTitle.textContent = "";
        matchSubTitle.style.color = data.theme.colours.primary;
        matchSubTitle.style.fontSize = '65px';
        matchSubTitle.style.fontFamily = 'Geogrotesque-Bold';

        const letters = startTime.split('').map(letter => {
          const span = document.createElement('span');
          span.textContent = letter;
          return span;
        });

        letters.forEach(letter => matchSubTitle.appendChild(letter));
    
        // GSAP Animation: create a sequence
        const tl = gsap.timeline();

        // animate the startTime using fromTo method to slide up from the bottom
        tl.fromTo(
          matchSubTitle,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          }
        );

        // stagger the letters' appearance
        tl.fromTo(
          matchSubTitle.children,
          { opacity: 0, y: 20 }, //
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.04,
          },
          '<' // start stagger animation as soon as the container finishes sliding up
        );

        // exit animation for startTime: slide up and fade out
        tl.to(
          matchSubTitle,
          { y: -100, opacity: 0, duration: 1.5, ease: 'power3.out' } // increased duration for background
        )
        .to(
          matchSubTitle.children,
          { y: -30, opacity: 0, duration: 1.5, stagger: 0.1, ease: 'power3.out' }, // increased duration for letters
          '<' // ensures exit animation for letters starts after background starts moving
        );
      }
    });        
  
    gsapTimeline.fromTo(
      '.centerText',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' },
      '<'
    );
  
    // transition to the next event
    gsapTimeline.to('.teamLogo, .centerText', { opacity: 0, duration: 0.5, delay: 0.5 });
  });
}

function displayUpcomingHighlightsText(data, canvas, gsapTimeline) {
  gsapTimeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    container.style.backgroundColor = data.theme.colours.primary;
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.height = '300px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';

    const highlightsText = document.createElement('h1');
    highlightsText.textContent = 'UPCOMING HIGHLIGHTS';
    highlightsText.style.color = data.theme.colours.textPrimary;
    highlightsText.style.textAlign = 'center';
    highlightsText.style.fontFamily = 'Geogrotesque-Bold';

    container.appendChild(highlightsText);
    canvas.appendChild(container);

    // split the text into individual span elements for each letter
    const letters = highlightsText.textContent.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      return span;
    });

    highlightsText.textContent = '';
    letters.forEach(letter => highlightsText.appendChild(letter));

    // apply GSAP staggered animation to each letter
    gsap.fromTo(letters, 
      { opacity: 0, y: 50, rotation: -10 },
      { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: 'power3.out', stagger: 0.02, delay: 0.5 }
    );
  });
  gsapTimeline.fromTo(
    'h1',
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  );
  gsapTimeline.to('h1', { opacity: 0, duration: 0.5, delay: 0.5 });
}

function displayCogooBayLogoP2(data, canvas, gsapTimeline) {
  gsapTimeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    container.style.backgroundColor = data.theme.colours.primary;
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.height = '300px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    
    const logo = document.createElement('img');
    logo.src = data.mainImage; // fetch Coogee Bay Hotel logo URL
    logo.alt = data.name;
    logo.style.width = '400px';
    logo.style.height = 'auto';
    logo.style.margin = '0 auto';
    logo.style.display = 'block';

    gsap.fromTo(
      logo,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    gsap.to(logo, {
      opacity: 0,
      y: -200,
      duration: 1,
      ease: 'power3.in',
      delay: 1,
    });

    container.appendChild(logo);
    canvas.appendChild(container);
  });

  gsapTimeline.fromTo(
    'img',
    { opacity: 0, scale: 0.8, y: 50 },
    { opacity: 1, scale: 1, y: 0, duration: 2, ease: 'power3.out' }
  );
}

function displayUpcomingEvents(data, canvas, gsapTimeline) {
  data.upcoming.forEach((event, index) => {
    gsapTimeline.call(() => {
      canvas.innerHTML = '';
      const eventContainer = document.createElement('div');
      eventContainer.style.backgroundColor = data.theme.colours.primary;
      eventContainer.style.padding = '20px';
      eventContainer.style.borderRadius = '10px';
      eventContainer.style.height = '300px';
      eventContainer.style.display = 'flex';
      eventContainer.style.alignItems = 'center';
      eventContainer.style.justifyContent = 'center';

      // team 1 logo
      const team1Logo = createTeamLogo(event.playerTeam1Image, event.playerTeam1Name);
      eventContainer.appendChild(team1Logo);

      // container for match details
      const matchDetailsContainer = document.createElement('div');
      matchDetailsContainer.style.display = 'flex';
      matchDetailsContainer.style.flexDirection = 'column';
      matchDetailsContainer.style.alignItems = 'center';
      matchDetailsContainer.style.textAlign = 'center';
      matchDetailsContainer.style.flex = '1';

      // subTitle
      const matchSubTitle = document.createElement('h2');
      matchSubTitle.textContent = event.subTitle;
      matchSubTitle.style.color = data.theme.colours.textPrimary;
      matchSubTitle.style.fontFamily = 'Geogrotesque-Regular';
      matchSubTitle.style.marginBottom = '-32px'; // spacing below subTitle
      matchSubTitle.className = 'centerSubText';

      // title
      const matchInfo = document.createElement('h3');
      matchInfo.textContent = event.title;
      matchInfo.style.color = data.theme.colours.textPrimary;
      matchInfo.style.fontFamily = 'Geogrotesque-SemiBold';
      matchInfo.className = 'centerText';

      // append subTitle and title to match details container
      matchDetailsContainer.appendChild(matchSubTitle);
      matchDetailsContainer.appendChild(matchInfo);

      // add match details container to event container
      eventContainer.appendChild(matchDetailsContainer);

      // team 2 logo
      const team2Logo = createTeamLogo(event.playerTeam2Image, event.playerTeam2Name);
      eventContainer.appendChild(team2Logo);

      canvas.appendChild(eventContainer);
    });

    // animate team logos
    gsapTimeline.from('.teamLogo', { opacity: 0, x: index % 2 === 0 ? -200 : 200, duration: 1, ease: 'power3.out' });

    gsapTimeline.fromTo(
      '.centerText',
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: 'power3.out' },
      '<'
    );

    // replace match info (title and subTitle) with startTime
    gsapTimeline.call(() => {
      const matchInfo = document.querySelector('.centerText');
      const matchSubTitle = document.querySelector('.centerSubText');
      const startTime = event.startTime;
    
      if (matchInfo) {
        matchInfo.textContent = "";
      }

      if (matchSubTitle) {
        matchSubTitle.style.backgroundColor = data.theme.colours.secondary;
        matchSubTitle.textContent = "";
        matchSubTitle.style.color = data.theme.colours.primary;
        matchSubTitle.style.fontSize = '65px';
        matchSubTitle.style.fontFamily = 'Geogrotesque-Bold';

        const letters = startTime.split('').map(letter => {
          const span = document.createElement('span');
          span.textContent = letter;
          return span;
        });

        letters.forEach(letter => matchSubTitle.appendChild(letter));
    
        // GSAP Animation: create a sequence
        const tl = gsap.timeline();

        // animate the startTime using fromTo method to slide up from the bottom
        tl.fromTo(
          matchSubTitle,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          }
        );

        // stagger the letters' appearance
        tl.fromTo(
          matchSubTitle.children,
          { opacity: 0, y: 20 }, //
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.04,
          },
          '<' // start stagger animation as soon as the container finishes sliding up
        );

        // exit animation for startTime: slide up and fade out
        tl.to(
          matchSubTitle,
          { y: -100, opacity: 0, duration: 1.5, ease: 'power3.out' } // increased duration for background
        )
        .to(
          matchSubTitle.children,
          { y: -30, opacity: 0, duration: 1.5, stagger: 0.1, ease: 'power3.out' }, // increased duration for letters
          '<' // ensures exit animation for letters starts after background starts moving
        );
      }
    });        
  
    gsapTimeline.fromTo(
      '.centerText',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' },
      '<'
    );
  
    // transition to the next event
    gsapTimeline.to('.teamLogo, .centerText', { opacity: 0, duration: 0.5, delay: 0.5 });
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

function displayEndingLogosWithTransition(data, canvas, gsapTimeline) {
  gsapTimeline.call(() => {
    canvas.innerHTML = '';
    const container = document.createElement('div');
    container.style.backgroundColor = data.theme.colours.primary;
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.height = '300px';
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between';
    container.style.alignItems = 'center';

    // Coogee Bay Hotel Logo (left side)
    const coogeeLogo = document.createElement('img');
    coogeeLogo.src = data.mainImage;
    coogeeLogo.alt = data.name;
    coogeeLogo.style.width = '400px';
    coogeeLogo.style.height = 'auto';
    coogeeLogo.style.marginLeft = '20px';

    // Powered by SportsYear Logo (right side)
    const sportsYearLogo = document.createElement('img');
    sportsYearLogo.src = './images/Sportsyear-logo.png';
    sportsYearLogo.alt = 'Powered by SportsYear Logo';
    sportsYearLogo.style.width = '400px';
    sportsYearLogo.style.height = 'auto';
    sportsYearLogo.style.marginRight = '20px';

    container.appendChild(coogeeLogo);
    container.appendChild(sportsYearLogo);
    canvas.appendChild(container);

    gsap.fromTo(
      coogeeLogo,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    gsap.fromTo(
      sportsYearLogo,
      { opacity: 0, scale: 0.8, x: -100 },
      {
        opacity: 1,
        scale: 1,
        x: 10, // move it to the right
        duration: 1.5,
        ease: 'power3.out',
        stagger: {
          amount: 2,
          from: 'center', // start the stagger from the center
        },
      }
    );
  });
  
  gsapTimeline.fromTo(
    'img',
    { opacity: 0, scale: 0.8, y: 50 },
    { opacity: 1, scale: 1, y: 0, duration: 4, ease: 'power3.out' }
  );
}

