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

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("zzhVm8YHKtcxNIIeP");

        emailjs.sendForm('service_d3uzcv9', 'template_5mnn9vb', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();

                // Show success message
                const formMessage = document.getElementById("form-message");
                formMessage.textContent = "Form Submitted Successfully!";
                formMessage.classList.remove("hidden");
                formMessage.classList.add("show");

                // Hide message after 4 seconds
                setTimeout(() => {
                    formMessage.classList.remove("show");
                    formMessage.classList.add("hidden");
                }, 4000);
            }, function (error) {
                console.log('FAILED...', error);

                // Show failure message
                const formMessage = document.getElementById("form-message");
                formMessage.textContent = "Form Submission Failed! Try Again";
                formMessage.classList.remove("hidden");
                formMessage.classList.add("show");

                // Hide message after 4 seconds
                setTimeout(() => {
                    formMessage.classList.remove("show");
                    formMessage.classList.add("hidden");
                }, 4000);
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

    // Cursor motion effect
    const cursor = document.createElement('div');
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.border = '2px solid #7b2ff7';
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.1s ease';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    });

    // Visual motion effect on cursor drag
    let particles = [];
    const maxParticles = 100;
    const colors = ['#7b2ff7', '#d20f0f', '#ff7b00', '#7400b8'];

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocityX: (Math.random() - 0.5) * 4,
            velocityY: (Math.random() - 0.5) * 4,
            life: 120
        };
    }

    function drawParticles(ctx) {
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
        });
    }

    function updateParticles() {
        particles.forEach((p, index) => {
            p.x += p.velocityX;
            p.y += p.velocityY;
            p.life--;
            p.size *= 0.92;
            if (p.life <= 0 || p.size <= 0.5) {
                particles.splice(index, 1);
            }
        });
    }

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log('Canvas resized:', canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let isDragging = false;

    document.addEventListener('mousedown', e => {
        isDragging = true;
        console.log('Drag started');
    });

    document.addEventListener('mouseup', e => {
        isDragging = false;
        console.log('Drag ended');
    });

    document.addEventListener('mousemove', e => {
        if (isDragging) {
            if (particles.length < maxParticles) {
                particles.push(createParticle(e.clientX, e.clientY));
                console.log('Particle created at:', e.clientX, e.clientY);
            }
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawParticles(ctx);
        updateParticles();
        requestAnimationFrame(animate);
    }
    animate();

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Aditya Kumar";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "Devops", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${encodeURIComponent(project.image)}" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

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
}
