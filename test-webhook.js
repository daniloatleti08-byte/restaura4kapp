const payload = {
  event: "purchase_approved",
  data: [{
    customer: { email: "daniloatleti08@gmail.com", name: "Danilo" },
    offer: { name: "Avulso 9,90", price: 9.9 },
    status: "paid",
    baseAmount: 9.9
  }]
};

fetch('https://pjroljmocwcehtachvri.supabase.co/functions/v1/cakto-webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(r => r.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
