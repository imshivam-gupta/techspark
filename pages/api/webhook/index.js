import Stripe from 'stripe';
import {buffer} from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if(req.method===POST){
        
        let event;

        try {

            const rawBody = await buffer(req);
            const signature = req.headers['stripe-signature'];

            event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
            
        } catch (error) {
            console.log(error);
            return res.status(400).send(`Webhook error: ${error.message}`);
        }

        console.log(success,event.id);

        if(event.type==='checkout.session.completed'){
            console.log('payment recieved');
        }else{
            console.warn(`Unhandled event type ${event.type}`);
        }

        res.status(200).json({received: true});
    }
    else{
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}