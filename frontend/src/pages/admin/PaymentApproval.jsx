import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

function PaymentApproval() {
  const { enqueueSnackbar } = useSnackbar();
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pending payments from backend
    // This would be an API call to your backend
    // Example: fetchPendingPayments();
    
    // Simulating API response with mock data for now
    setTimeout(() => {
      const mockPendingPayments = [
        {
          id: 'pay_123456',
          amount: 1500,
          cardHolder: 'John Doe',
          timestamp: '2023-07-15T14:30:00Z',
          event: {
            id: 'evt_1',
            name: 'Tech Conference 2023'
          },
          user: {
            id: 'usr_1',
            name: 'John Doe',
            email: 'john@example.com'
          }
        },
        {
          id: 'pay_123457',
          amount: 2500,
          cardHolder: 'Jane Smith',
          timestamp: '2023-07-16T10:15:00Z',
          event: {
            id: 'evt_2',
            name: 'Music Festival'
          },
          user: {
            id: 'usr_2',
            name: 'Jane Smith',
            email: 'jane@example.com'
          }
        }
      ];
      
      setPendingPayments(mockPendingPayments);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (paymentId) => {
    // Call API to approve payment
    // Example: approvePayment(paymentId);
    
    console.log(`Approving payment: ${paymentId}`);
    
    // Simulate successful approval
    setPendingPayments(prevPayments => 
      prevPayments.filter(payment => payment.id !== paymentId)
    );
    
    enqueueSnackbar('Payment approved successfully! User registered for event.', { 
      variant: 'success' 
    });
  };

  const handleReject = (paymentId) => {
    // Call API to reject payment
    // Example: rejectPayment(paymentId);
    
    console.log(`Rejecting payment: ${paymentId}`);
    
    // Simulate successful rejection
    setPendingPayments(prevPayments => 
      prevPayments.filter(payment => payment.id !== paymentId)
    );
    
    enqueueSnackbar('Payment rejected.', { 
      variant: 'warning' 
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pending Payment Approvals</h2>
      
      {pendingPayments.length === 0 ? (
        <p>No pending payments to approve.</p>
      ) : (
        <div>
          <p>The following payments are awaiting your approval:</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Payment ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>User</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Event</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPayments.map(payment => (
                  <tr key={payment.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{payment.id}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                      {payment.user.name}<br/>
                      <span style={{ fontSize: '0.8em', color: '#666' }}>{payment.user.email}</span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{payment.event.name}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>LKR {payment.amount.toFixed(2)}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                      {new Date(payment.timestamp).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                      <button 
                        onClick={() => handleApprove(payment.id)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '10px'
                        }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(payment.id)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentApproval;
