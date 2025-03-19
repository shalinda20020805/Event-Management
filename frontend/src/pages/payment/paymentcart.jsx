import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentForm() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  // Get event registration data from location state if available
  const eventRegistrationData = location.state?.registrationData || {};
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    amount: location.state?.amount || ''
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    amount: ''
  });

  const validateCardNumber = (cardNumber) => {
    const cardNumberRegex = /^[0-9]{16}$/;
    return cardNumberRegex.test(cardNumber.replace(/\s/g, '')) 
      ? '' 
      : 'Card number must be 16 digits';
  };

  const validateCardHolder = (cardHolder) => {
    const cardHolderRegex = /^[a-zA-Z\s]+$/;
    return cardHolderRegex.test(cardHolder) 
      ? '' 
      : 'Card holder name should contain only letters';
  };

  const validateExpiryDate = (expiryDate) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) {
      return 'Expiry date must be in MM/YY format';
    }
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return 'Card has expired';
    }
    
    return '';
  };

  const validateCVV = (cvv) => {
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(cvv) ? '' : 'CVV must be 3 or 4 digits';
  };

  const validateAmount = (amount) => {
    return amount > 0 ? '' : 'Amount must be greater than zero';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      const formattedValue = digitsOnly
        .substring(0, 16)
        .replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === 'expiryDate') {
      const digitsOnly = value.replace(/\D/g, '');
      let formattedValue = digitsOnly;
      if (digitsOnly.length > 2) {
        formattedValue = `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2, 4)}`;
      }
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === 'cvv') {
      const digitsOnly = value.replace(/\D/g, '').substring(0, 4);
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    let errorMessage = '';
    switch (name) {
      case 'cardNumber':
        errorMessage = validateCardNumber(value);
        break;
      case 'cardHolder':
        errorMessage = validateCardHolder(value);
        break;
      case 'expiryDate':
        errorMessage = validateExpiryDate(value);
        break;
      case 'cvv':
        errorMessage = validateCVV(value);
        break;
      case 'amount':
        errorMessage = validateAmount(value);
        break;
      default:
        break;
    }
    
    setErrors({ ...errors, [name]: errorMessage });
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: validateCardNumber(formData.cardNumber),
      cardHolder: validateCardHolder(formData.cardHolder),
      expiryDate: validateExpiryDate(formData.expiryDate),
      cvv: validateCVV(formData.cvv),
      amount: validateAmount(formData.amount)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Payment processing logic with backend integration
      const paymentData = {
        ...formData,
        eventRegistrationData,
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      
      // Here you would make an API call to your backend
      // For example: 
      // axios.post('/api/payments', paymentData)
      //   .then(response => { ... })
      //   .catch(error => { ... });
      
      console.log('Payment Data to be sent to backend:', paymentData);
      
      // Show pending approval message
      enqueueSnackbar('Payment submitted! Waiting for admin approval.', { 
        variant: 'info' 
      });
      
      // Redirect to pending confirmation page after short delay
      setTimeout(() => {
        navigate('/pending-approval', { state: { paymentId: 'temp-id-' + Date.now() } });
      }, 1500);
    } else {
      enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
      console.log('Form has validation errors');
    }
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px'
  };

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '8px',
    border: errors[fieldName] ? '1px solid red' : '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  });

  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        color: '#333'
      }}>Payment Details</h2>
      
      {eventRegistrationData.eventName && (
        <div style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>Event: {eventRegistrationData.eventName}</p>
          {eventRegistrationData.ticketType && (
            <p style={{ margin: '5px 0 0' }}>Ticket: {eventRegistrationData.ticketType}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#555'
          }}>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            style={getInputStyle('cardNumber')}
            maxLength={19}
            required
          />
          {errors.cardNumber && <div style={errorStyle}>{errors.cardNumber}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#555'
          }}>Card Holder Name</label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
            placeholder="John Doe"
            style={getInputStyle('cardHolder')}
            maxLength={50}
            required
          />
          {errors.cardHolder && <div style={errorStyle}>{errors.cardHolder}</div>}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          marginBottom: '15px'
        }}>
          <div style={{ flex: '1' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#555'
            }}>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              style={getInputStyle('expiryDate')}
              maxLength={5}
              required
            />
            {errors.expiryDate && <div style={errorStyle}>{errors.expiryDate}</div>}
          </div>

          <div style={{ flex: '1' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#555'
            }}>CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              style={getInputStyle('cvv')}
              maxLength={4}
              required
            />
            {errors.cvv && <div style={errorStyle}>{errors.cvv}</div>}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#555'
          }}>Amount (LKR)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="1500.00"
            style={getInputStyle('amount')}
            max={999999}
            step="0.01"
            required
          />
          {errors.amount && <div style={errorStyle}>{errors.amount}</div>}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Submit Payment
        </button>
        
        <p style={{ 
          marginTop: '15px', 
          fontSize: '13px', 
          color: '#666',
          textAlign: 'center' 
        }}>
          Note: Your registration will be confirmed after payment approval by the administrator.
        </p>
      </form>
    </div>
  );
}

export default PaymentForm;
