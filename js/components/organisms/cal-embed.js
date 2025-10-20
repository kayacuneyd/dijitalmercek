/**
 * Cal.com Embed Component
 * Calendar scheduling organism with static UI placeholder
 */

class CalEmbed extends HTMLElement {
  constructor() {
    super();
    this.availableSlots = [];
    this.selectedDate = null;
    this.selectedTime = null;
  }

  connectedCallback() {
    this.generateMockSlots();
    this.render();
    this.attachEventListeners();
  }

  generateMockSlots() {
    // Generate mock available time slots for the next 7 days
    const today = new Date();
    this.availableSlots = [];

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const daySlots = [];
      const hours = [9, 10, 11, 14, 15, 16, 17];

      hours.forEach(hour => {
        if (Math.random() > 0.3) { // 70% chance of being available
          daySlots.push({
            time: `${hour}:00`,
            available: true
          });
        }
      });

      if (daySlots.length > 0) {
        this.availableSlots.push({
          date: date,
          dateString: date.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          slots: daySlots
        });
      }
    }
  }

  render() {
    this.innerHTML = `
      <div class="cal-embed-container">
        <!-- Header -->
        <div class="text-center mb-4">
          <h3 class="h5 mb-2">Görüşme Planla</h3>
          <p class="text-muted small">
            Projenizi konuşmak için uygun bir zaman seçin. Görüşme 30 dakika sürecek.
          </p>
        </div>

        <!-- Date Selection -->
        <div class="mb-4">
          <h4 class="h6 mb-3">Tarih Seçin</h4>
          <div class="row g-2" id="date-selection">
            ${this.renderDateOptions()}
          </div>
        </div>

        <!-- Time Selection -->
        <div class="mb-4" id="time-selection-container" style="display: none;">
          <h4 class="h6 mb-3">Saat Seçin</h4>
          <div class="row g-2" id="time-selection">
            <!-- Time slots will be populated when date is selected -->
          </div>
        </div>

        <!-- Selected Info -->
        <div class="selected-info mb-4" id="selected-info" style="display: none;">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title h6">Seçilen Görüşme</h5>
              <p class="card-text mb-2">
                <strong>Tarih:</strong> <span id="selected-date-display"></span>
              </p>
              <p class="card-text mb-2">
                <strong>Saat:</strong> <span id="selected-time-display"></span>
              </p>
              <p class="card-text">
                <strong>Süre:</strong> 30 dakika
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-grid gap-2">
          <button class="btn btn-primary" id="confirm-booking" disabled>
            <span class="me-2">📅</span>
            Görüşmeyi Onayla
          </button>
          <button class="btn btn-outline-secondary" id="cancel-selection">
            <span class="me-2">❌</span>
            Seçimi İptal Et
          </button>
        </div>

        <!-- Demo Notice -->
        <div class="alert alert-info mt-3">
          <strong>Demo:</strong> Bu bir mock calendar widget'ıdır. Gerçek Cal.com entegrasyonu için API anahtarı gereklidir.
        </div>
      </div>
    `;
  }

  renderDateOptions() {
    return this.availableSlots.map((day, index) => `
      <div class="col-6 col-md-4">
        <button class="btn btn-outline-primary w-100 date-option" 
                data-date-index="${index}"
                data-date="${day.date.toISOString().split('T')[0]}">
          <div class="small">${day.dateString.split(' ')[0]}</div>
          <div class="fw-bold">${day.date.getDate()}</div>
          <div class="small text-muted">${day.slots.length} slot</div>
        </button>
      </div>
    `).join('');
  }

  renderTimeOptions(dateIndex) {
    const day = this.availableSlots[dateIndex];
    if (!day) return '';

    return day.slots.map((slot, slotIndex) => `
      <div class="col-6 col-md-4">
        <button class="btn btn-outline-secondary w-100 time-option" 
                data-slot-index="${slotIndex}"
                data-time="${slot.time}">
          ${slot.time}
        </button>
      </div>
    `).join('');
  }

  attachEventListeners() {
    // Date selection
    const dateOptions = this.querySelectorAll('.date-option');
    dateOptions.forEach(button => {
      button.addEventListener('click', (e) => {
        this.selectDate(e.target.dataset.dateIndex);
      });
    });

    // Time selection (will be attached when time options are rendered)
    this.addEventListener('click', (e) => {
      if (e.target.classList.contains('time-option')) {
        this.selectTime(e.target.dataset.time);
      }
    });

    // Confirm booking
    const confirmBtn = this.querySelector('#confirm-booking');
    confirmBtn?.addEventListener('click', () => {
      this.confirmBooking();
    });

    // Cancel selection
    const cancelBtn = this.querySelector('#cancel-selection');
    cancelBtn?.addEventListener('click', () => {
      this.cancelSelection();
    });
  }

  selectDate(dateIndex) {
    // Reset previous selections
    this.selectedTime = null;
    
    // Update selected date
    this.selectedDate = dateIndex;
    
    // Update UI
    document.querySelectorAll('.date-option').forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline-primary');
    });
    
    const selectedDateBtn = document.querySelector(`[data-date-index="${dateIndex}"]`);
    selectedDateBtn?.classList.remove('btn-outline-primary');
    selectedDateBtn?.classList.add('btn-primary');

    // Show time selection
    const timeContainer = this.querySelector('#time-selection-container');
    const timeSelection = this.querySelector('#time-selection');
    
    if (timeContainer && timeSelection) {
      timeSelection.innerHTML = this.renderTimeOptions(dateIndex);
      timeContainer.style.display = 'block';
    }

    // Hide selected info until time is selected
    const selectedInfo = this.querySelector('#selected-info');
    selectedInfo?.style.setProperty('display', 'none');
  }

  selectTime(time) {
    this.selectedTime = time;
    
    // Update UI
    document.querySelectorAll('.time-option').forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline-secondary');
    });
    
    const selectedTimeBtn = document.querySelector(`[data-time="${time}"]`);
    selectedTimeBtn?.classList.remove('btn-outline-secondary');
    selectedTimeBtn?.classList.add('btn-primary');

    // Show selected info
    this.updateSelectedInfo();
    
    // Enable confirm button
    const confirmBtn = this.querySelector('#confirm-booking');
    confirmBtn?.removeAttribute('disabled');
  }

  updateSelectedInfo() {
    const selectedInfo = this.querySelector('#selected-info');
    const selectedDateDisplay = this.querySelector('#selected-date-display');
    const selectedTimeDisplay = this.querySelector('#selected-time-display');

    if (selectedInfo && selectedDateDisplay && selectedTimeDisplay && this.selectedDate !== null && this.selectedTime) {
      const day = this.availableSlots[this.selectedDate];
      selectedDateDisplay.textContent = day.dateString;
      selectedTimeDisplay.textContent = this.selectedTime;
      selectedInfo.style.display = 'block';
    }
  }

  confirmBooking() {
    if (this.selectedDate === null || !this.selectedTime) {
      alert('Lütfen tarih ve saat seçin.');
      return;
    }

    const day = this.availableSlots[this.selectedDate];
    
    const bookingData = {
      date: day.date.toISOString().split('T')[0],
      time: this.selectedTime,
      duration: '30 dakika',
      timestamp: new Date().toISOString()
    };

    // Dispatch booking event
    this.dispatchEvent(new CustomEvent('booking-confirmed', {
      detail: bookingData,
      bubbles: true
    }));

    // Show success message
    alert(`Görüşme planlandı!\nTarih: ${day.dateString}\nSaat: ${this.selectedTime}\n\nE-posta adresinize onay mesajı gönderilecek.`);

    // Reset selection
    this.cancelSelection();
  }

  cancelSelection() {
    this.selectedDate = null;
    this.selectedTime = null;

    // Reset UI
    document.querySelectorAll('.date-option, .time-option').forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline-primary', 'btn-outline-secondary');
    });

    // Hide time selection
    const timeContainer = this.querySelector('#time-selection-container');
    timeContainer?.style.setProperty('display', 'none');

    // Hide selected info
    const selectedInfo = this.querySelector('#selected-info');
    selectedInfo?.style.setProperty('display', 'none');

    // Disable confirm button
    const confirmBtn = this.querySelector('#confirm-booking');
    confirmBtn?.setAttribute('disabled', 'true');
  }
}

customElements.define('cal-embed', CalEmbed);
