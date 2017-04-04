var socket = io.connect('//localhost:3000');
var imageFileNames = [
    'snapshot-0000028.png',
    'snapshot-0000034.png',
    'snapshot-0000263.png',
    'snapshot-0000055.png',
    'snapshot-0000056.png',
    'snapshot-0000071.png',
    'snapshot-0000028.png',
    'snapshot-0000034.png',
    'snapshot-0000263.png',
    'snapshot-0000055.png',
    'snapshot-0000056.png',
    'snapshot-0000071.png',
    'snapshot-0000069.png'
];
var container = document.getElementById('incoming');
var currentWidth;

var recalculateImageHeight = function(image) {
    var images;
    currentWidth = image.width;

    if (image.getBoundingClientRect().bottom > window.innerHeight) {
        images = document.querySelectorAll('img');

        images.forEach(function(image) {
            image.style.width = image.width - 30 + 'px';
        });

        recalculateImageHeight(image);
    }
};

var appendSnapshot = function(filename) {
    var image = document.createElement('img');
    var imageContainer = document.createElement('div');
    // var imageCaption = document.createElement('p');

    imageContainer.className = 'img_container';
    // imageCaption.className = 'img_caption';
    // imageCaption.innerHTML = filename;
    image.src = 'images/' + filename;
    image.style.width = currentWidth + 'px';

    imageContainer.appendChild(image);
    // imageContainer.appendChild(imageCaption);
    container.appendChild(imageContainer);
};

window.setInterval(function() {
    recalculateImageHeight(container.lastChild.children[0])
}, 2000);

imageFileNames.forEach(function(filename) {
    appendSnapshot(filename);
});

// socket.on('currentSnapshots', function(filenames) {
//     filenames.forEach(function(filename) {
//         appendSnapshot(filename);
//     });
// });

socket.on('newSnapshot', function(filename) {
    console.log(filename);

    imageFileNames.push(filename);
    appendSnapshot(filename);
});

socket.on('error', function() {
    console.error(arguments)
});