let progress = 0;
        let progressBar = document.getElementById("progress");
        let loadingText = document.getElementById("loading-text");

        function updateProgress() {
            if (progress < 100) {
                progress += 1; 
                progressBar.style.width = progress + "%";
                loadingText.innerText = "Carregando... " + progress + "%";
                setTimeout(updateProgress, 30); 
            } else {
                window.location.href = "index.html"; 
            }
        }

        updateProgress();