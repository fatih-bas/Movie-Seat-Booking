const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
// Save selected movie index and price
function setMovieData(movieIndex, MoviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', MoviePrice);
}
// update total and count
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCounts = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;
}
// Get data local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCountAndTotal();
})
// seat click event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
   e.target.classList.toggle('selected');
   updateSelectedCountAndTotal();
  }
});
// initial count and total set
updateSelectedCountAndTotal();