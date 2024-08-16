import React from 'react'
import '../css/BookingTermsComponent.css'
import bookingTermsCondition from '../images/booking-terms-conditions.png'

const BookingTermsComponent = () => {
  return (
    <div className='booking-terms-box'>
      <img src={bookingTermsCondition} alt='Booking Terms & Conditions' className='booking-terms-condition-image'></img>
      <div className='terms-and-conditions-container'>
        <div className='terms-and-conditons'>
          <h3 className='terms-and-conditons-heading'>Booking Confirmation and Payment</h3>
          <p>1. Payment must be made in full or as a deposit to confirm your booking.</p>
          <p>2. A booking confirmation will be sent via email or provided as a ticket; it is essential to review for accuracy.</p>
        </div>
        <div className='terms-and-conditons'>
          <h3 className='terms-and-conditons-heading'>Cancellation and Modification</h3>
          <p>1. Changes to bookings (e.g., dates, names) may incur fees and must be requested within specific time limits.</p>
          <p>2. Cancellations may result in forfeiture of the ticket price or part of it, depending on the fare rules.</p>
        </div>
        <div className='terms-and-conditons'>
          <h3 className='terms-and-conditons-heading'>Baggage Policy</h3>
          <p>1. Includes allowances for carry-on and checked baggage, with limits on weight and size.</p>
          <p>2. Fees apply for excess, oversized, or additional baggage beyond the standard allowance.</p>
        </div>
        <div className='terms-and-conditons'>
          <h3 className='terms-and-conditons-heading'>Refunds and Compensation</h3>
          <p>1. Refund eligibility depends on the ticket type and the reason for refund.</p>
          <p>2. Compensation for flight delays, cancellations, or denied boarding follows the airline's policy and relevant regulations.</p>
        </div>
        <div className='terms-and-conditons'>
          <h3 className='terms-and-conditons-heading'>Travel Documents and Identification</h3>
          <p>1. Passengers must present valid identification and required travel documents (e.g., passport, visa).</p>
          <p>2. Responsibility lies with the passenger to ensure compliance with entry requirements for the destination.</p>
        </div>        
      </div>
    </div>
  )
}

export default BookingTermsComponent