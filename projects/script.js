$(document).ready(function () {
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
      document.querySelector('#scroll-top').classList.add('active');
    } else {
      document.querySelector('#scroll-top').classList.remove('active');
    }
  });
});

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    document.title = 'Projects | Portfolio Aditya Kumar';
    $('#favicon').attr('href', '/assets/images/favicon.png');
  } else {
    document.title = 'Come Back To Portfolio';
    $('#favicon').attr('href', '/assets/images/favhand.png');
  }
});

// fetch projects start
function getProjects() {
  return fetch('/projects/projects.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Projects loaded successfully:', data); // Debug log
      return data;
    })
    .catch((error) => {
      console.error('Error fetching projects:', error);
      return []; // Return empty array on error
    });
}

// Map project categories to filter button classes
const categoryClassMap = {
  'Gen Ai': 'android',
  'AI-ML': 'lamp',
  basicweb: 'basicweb',
};

function showProjects(projects) {
  console.log('showProjects called with:', projects); // Debug log

  let projectsContainer = document.querySelector('.box-container');
  console.log('Container found:', projectsContainer); // Debug log

  if (!projectsContainer) {
    console.error('Project container not found!');
    return;
  }

  let projectsHTML = '';

  if (!projects || projects.length === 0) {
    projectsHTML =
      '<p style="text-align: center; color: white; font-size: 18px;">No projects found.</p>';
    console.log('No projects to display');
  } else {
    console.log('Rendering', projects.length, 'projects');
    projects.forEach((project, index) => {
      console.log('Processing project', index + 1, ':', project.name);
      // Map category to class for filtering
      let categoryClass = categoryClassMap[project.category] || '';
      projectsHTML += `
            <div class="grid-item ${categoryClass}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
          <img draggable="false" src="/assets/images/projects/${encodeURIComponent(
            project.image
          )}" alt="project" />
          <div class="content">
            <div class="tag">
            <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${
                  project.links.code
                }" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>
        </div>`;
    });
  }

  projectsContainer.innerHTML = projectsHTML;
  console.log('HTML inserted into container');

  // Only initialize isotope if there are projects
  if (projects && projects.length > 0) {
    console.log('Initializing isotope');
    // Wait a bit for DOM to update
    setTimeout(() => {
      // isotope filter products
      var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
          columnWidth: 200,
        },
      });

      // filter items on button click
      $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });
    }, 100);
  }
}

// Load projects when DOM is ready
$(document).ready(function () {
  console.log('DOM ready, loading projects...');
  getProjects().then((data) => {
    showProjects(data);
  });
});

// fetch projects end

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
};
