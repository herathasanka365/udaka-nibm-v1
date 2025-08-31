import React from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MessageSquare, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { GlassCard } from '@/components/ui/glass-card';
import { PrimaryButton } from '@/components/ui/primary-button';
import { useToastNotification } from '@/components/ui/toast-notification';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import contactBanner from '@/assets/contact-banner.jpg';
import faqIcon from '@/assets/faq-icon.jpg';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  userType: z.string().min(1, {
    message: "Please select a user type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast, ToastContainer } = useToastNotification();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      userType: "",
      message: "",
    },
  });

  // Submit form to Supabase
  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: data.name,
          email: data.email,
          message: data.message,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Message Sent!',
        message: 'Thank you for reaching out. We\'ll get back to you within 24 hours.',
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      addToast({
        type: 'error',
        title: 'Send Failed',
        message: 'Unable to send your message. Please try again or email us directly.',
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    submitMutation.mutate(values);
  };

  const faqs = [
    {
      question: "How do I register as a Creator or Client?",
      answer: "Choose Creator or Client when you sign up. Creators showcase their portfolios and apply for projects, while Clients post projects and hire talent. You can create your account by clicking the 'For Creators' or 'For Clients' buttons in the header."
    },
    {
      question: "What fees does the platform charge?",
      answer: "We charge a small service fee of 5% on completed projects. This helps us maintain the platform, provide customer support, and continue improving our services. There are no upfront costs or monthly subscription fees."
    },
    {
      question: "How do I post a project as a Client?",
      answer: "After registering as a Client, go to your dashboard and click 'Post New Project'. Fill in your project details, requirements, budget, and timeline. Once published, creators can browse and apply to your project."
    },
    {
      question: "How do I build my Creator portfolio?",
      answer: "In your Creator dashboard, go to the Portfolio section. Upload high-quality work samples, write a compelling bio, list your skills, and add relevant project descriptions. A strong portfolio significantly increases your chances of getting hired."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment processing. All transactions are protected and we never store your complete payment information on our servers. We partner with trusted payment providers for maximum security."
    },
    {
      question: "How do I apply to projects as a Creator?",
      answer: "Browse available projects in the Explore section, review the requirements, and submit your application with relevant portfolio samples and a personalized message explaining why you're the perfect fit for the project."
    },
    {
      question: "Can I communicate with Creators/Clients before hiring?",
      answer: "Absolutely! Our platform includes messaging features that allow you to discuss project details, timeline, and requirements before making any commitments. Clear communication leads to better project outcomes."
    },
    {
      question: "What if I'm not satisfied with the work delivered?",
      answer: "We have a comprehensive dispute resolution process. Contact our support team immediately and we'll help mediate any issues. We also offer a satisfaction guarantee for qualifying projects and maintain project milestone protections."
    },
    {
      question: "How do I get featured on the platform?",
      answer: "Maintain high-quality work, excellent client reviews, and active participation. Featured profiles are selected based on portfolio quality, client satisfaction ratings, and platform engagement. Keep your profile updated and deliver exceptional work."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! Our dedicated support team is available Monday through Friday, 9 AM to 6 PM PST. You can reach us via email at support@yourapp.com, phone at +1-123-456-7890, or through this contact form. We typically respond within 4 hours during business days."
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@yourapp.com",
      description: "Send us an email anytime - we respond within 4 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1-123-456-7890",
      description: "Mon-Fri 9am-6pm PST - Immediate assistance"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "San Francisco, CA",
      description: "Serving creators and clients worldwide"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${contactBanner})` }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-8">We're here to help you succeed</p>
        </div>
      </section>

      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GlassCard className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your name"
                              className="backdrop-blur-glass bg-card/50 border-border focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="backdrop-blur-glass bg-card/50 border-border focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                     />

                     <FormField
                       control={form.control}
                       name="userType"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-foreground font-medium">
                             I am a *
                           </FormLabel>
                           <FormControl>
                             <Select value={field.value} onValueChange={field.onChange}>
                               <SelectTrigger className="backdrop-blur-glass bg-card/50 border-border focus:border-primary">
                                 <SelectValue placeholder="Select your role" />
                               </SelectTrigger>
                               <SelectContent className="bg-popover border-border z-50">
                                 <SelectItem value="creator">Creator</SelectItem>
                                 <SelectItem value="client">Client</SelectItem>
                                 <SelectItem value="other">Other</SelectItem>
                               </SelectContent>
                             </Select>
                           </FormControl>
                           <FormMessage className="text-destructive" />
                         </FormItem>
                       )}
                     />

                     <FormField
                       control={form.control}
                       name="message"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-foreground font-medium">
                             Message *
                           </FormLabel>
                           <FormControl>
                             <Textarea
                               placeholder="How can we help you?"
                               className="backdrop-blur-glass bg-card/50 border-border focus:border-primary min-h-[120px] resize-none"
                               {...field}
                             />
                           </FormControl>
                           <FormMessage className="text-destructive" />
                         </FormItem>
                       )}
                     />

                    <PrimaryButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-3 text-lg font-semibold group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </PrimaryButton>
                  </form>
                </Form>
              </GlassCard>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h4>
                          <p className="text-foreground mb-1">
                            {info.content}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Quick Response Guarantee
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We respond to all inquiries within 4 hours during business days (Mon-Fri, 9AM-6PM PST). For urgent matters, call us directly.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* FAQ Section */}
          <section>
            <div className="text-center mb-12">
              <img src={faqIcon} alt="FAQ" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about using CineHubLK
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <GlassCard className="overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border-border/50 last:border-0"
                    >
                      <AccordionTrigger 
                        className="px-8 py-6 hover:no-underline hover:bg-muted/20 transition-colors text-left"
                        aria-label={`FAQ: ${faq.question}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-semibold text-foreground text-lg">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-6">
                        <div className="ml-12">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </GlassCard>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <GlassCard className="p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Still Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Can't find what you're looking for? Our support team is always ready to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hello@cinehublk.com"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-glass bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Support
                </a>
                <a 
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-glass border border-border backdrop-blur-glass bg-card/50 text-foreground hover:bg-card/70 transition-colors"
                >
                  Learn More About Us
                </a>
              </div>
            </GlassCard>
          </section>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Contact;