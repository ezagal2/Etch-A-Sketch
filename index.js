document.addEventListener('DOMContentLoaded', (event) => {
    let isMouseDown = false;
    const gridContainer = document.getElementById('grid-container');
    const gridSizeSlider = document.getElementById('grid-size-slider');
    const gridSizeLabel = document.getElementById('grid-size-label');
    const clearBtn = document.getElementById('clear-btn');
    const eraseBtn = document.getElementById('erase-btn');
    const colorPicker = document.getElementById('color-picker'); // Reference to the native color picker
    const customColorPicker = document.querySelector('.custom-color-picker');
    let currentColor = colorPicker.value;
    customColorPicker.style.backgroundColor = currentColor;

    function toggleButtonState() {
        eraseBtn.classList.toggle('active');
        clearBtn.disabled = !clearBtn.disabled;
        clearBtn.style.opacity = clearBtn.disabled ? 0.3 : 1;
    }

    function createGridItem() {
        let gridItem = document.createElement('div');
        gridItem.style.cssText = 'flex-grow: 1; flex-basis: 0; height: 100%; border: 1px solid #D3D3D3;';
        gridItem.addEventListener('mouseenter', () => isMouseDown && (gridItem.style.backgroundColor = currentColor));
        gridItem.addEventListener('mousedown', () => {
            gridItem.style.backgroundColor = currentColor;
            isMouseDown = true;
        });
        return gridItem;
    }

    function createGrid(numOfRowsAndColumns) {
        gridContainer.innerHTML = '';
        gridContainer.style.cssText = 'display: flex; flex-direction: column;';
        for (let i = 0; i < numOfRowsAndColumns; i++) {
            let row = document.createElement('div');
            row.style.cssText = `display: flex; height: calc(100% / ${numOfRowsAndColumns});`;
            for (let j = 0; j < numOfRowsAndColumns; j++) {
                row.appendChild(createGridItem());
            }
            gridContainer.appendChild(row);
        }
    }

    function buttonUpdateCurrentColor(buttonColor) {
        currentColor = buttonColor;
    }

    function colorPickerUpdateCurrentColor(colorPickerColor) {
        currentColor = colorPickerColor;
        customColorPicker.style.backgroundColor = colorPickerColor;
    }

    eraseBtn.addEventListener('click', function() {
        toggleButtonState();
        buttonUpdateCurrentColor(this.classList.contains('active') ? 'white' : colorPicker.value);
    });

    clearBtn.addEventListener('click', () => gridContainer.querySelectorAll('div').forEach(gridItem => gridItem.style.backgroundColor = 'white'));

    document.addEventListener('mousedown', () => isMouseDown = true);
    document.addEventListener('mouseup', () => isMouseDown = false);

    gridSizeSlider.addEventListener('input', () => {
        gridSizeLabel.textContent = `${gridSizeSlider.value}x${gridSizeSlider.value}`;
        createGrid(parseInt(gridSizeSlider.value));
    });

    colorPicker.addEventListener('input', () => colorPickerUpdateCurrentColor(colorPicker.value));
    gridContainer.addEventListener('mouseleave', () => isMouseDown = false);

    createGrid(16); // Initialize the grid with default size
});
