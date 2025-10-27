import { useState, useEffect } from "react";

function ProgressBar({ isLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    let width = 0;
    const id = setInterval(() => {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        setProgress(width);
      }
    }, 40);

    return () => clearInterval(id);
  }, [isLoading]);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress < 30
          ? progress + "%"
          : progress < 90
          ? "Fake laddar..."
          : progress + "%"}
      </div>
    </div>
  );
}

export default ProgressBar;
// Source https://www.w3schools.com/howto/howto_js_progressbar.asp
/* var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
} */
