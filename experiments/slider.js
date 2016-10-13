'use strict';

module.exports = (el, min=100) => {
  el.dataset.min = min;
  el.removeEventListener('mousedown', slider);
  el.addEventListener('mousedown', slider);
  return el;
}

function slider({ target }) {
    const width = target.parentElement.clientWidth;
    const max   = width - target.dataset.min;

    const start = e => {
        let x = Math.min(max, Math.max(min, e.clientX));
        target.nextElementSibling.style.width = width - x + 'px';
        target.previousElementSibling.style.width = target.style.left = x + 'px';
      }

    const stop = e =>  {
        document.documentElement.removeEventListener('mousemove', start, false);
        document.documentElement.removeEventListener('mouseup', stop, false);
      }

    document.documentElement.addEventListener('mousemove', start, false);
    document.documentElement.addEventListener('mouseup', stop, false);
  }



function slider(ruller, min=100) {
    declare.accessor(ruller, 'left', function() {
          return this.style.left;
        }, function(pos) {
              let w = this.parentElement.clientWidth;
              let max = w - min;
              let x = Math.min(max, Math.max(min, pos))
              this.nextElementSibling.style.width = w - x + 'px';
              this.previousElementSibling.style.width = this.style.left = x + 'px';
            })

    const start = e => ruller.left = e.clientX
    const stop = e =>  {
        document.documentElement.removeEventListener('mousemove', start, false);
        document.documentElement.removeEventListener('mouseup', stop, false);
      }

    ruller.addEventListener('mousedown', e => {
        document.documentElement.addEventListener('mousemove', start, false);
        document.documentElement.addEventListener('mouseup', stop, false);
      })

  }