const projects = [
  { title: "Project 1", description: "Coming soon!" },
  { title: "Project 2", description: "Coming soon!" },
  { title: "Project 3", description: "Coming soon!" },
  { title: "Project 4", description: "Coming soon!" },
];


const projectsContainer = document.getElementById('projects');


projects.forEach(project => {
  const card = document.createElement('div');
  card.classList.add('project-card');

  const projectTitle = document.createElement('h2');
  projectTitle.textContent = project.title;

  const projectDesc = document.createElement('p');
  projectDesc.textContent = project.description;

  card.appendChild(projectTitle);
  card.appendChild(projectDesc);

  projectsContainer.appendChild(card);
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
});