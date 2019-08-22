import {CountUp} from './countUp.min.js';

document.addEventListener('DOMContentLoaded', function () {
    initCounters();
});

const COUNTER_DEFAULT_OPTIONS = {
    startVal: 0,
    decimalPlaces: 0,
    duration: 2,
    useGrouping: true,
    separator: ' ',
    decimal: ',',
    suffix: '',
};

function startCounter($el, options) {
    let countUp = new CountUp($el, options.endVal, options);
    if (options.delay) {
        setTimeout(function() {
            countUp.start();
        }, options.delay);
    } else {
        countUp.start();
    }
}

function initCounters() {
    let $counters = document.querySelectorAll('.js-counter');

    if ("IntersectionObserver" in window) {
        let counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let options = {...COUNTER_DEFAULT_OPTIONS, ...entry.target['dataset']};
                    startCounter(entry.target, options);
                    observer.unobserve(entry.target);
                }
            });
        });

        $counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    } else {
        $counters.forEach(function ($counter) {
            let options = {...COUNTER_DEFAULT_OPTIONS, ...$counter.dataset};
            startCounter($counter, options);
        });
    }
}
