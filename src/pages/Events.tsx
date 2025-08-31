import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import eventsBanner from "@/assets/events-banner.jpg";
import creativeWorkshop from "@/assets/creative-workshop.jpg";
import businessNetworking from "@/assets/business-networking.jpg";
import calendarIcon from "@/assets/calendar-icon.jpg";
import eventPosterArt from "@/assets/event-poster-art.jpg";
import eventPosterBusiness from "@/assets/event-poster-business.jpg";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "creator" | "client" | "both";
  attendees: number;
  maxAttendees: number;
  thumbnail: string;
  price?: string;
  speakers?: Array<{
    name: string;
    bio: string;
    title: string;
  }>;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Creative Workshop - Sept 15, 2025: Learn Digital Tools",
    date: "2025-09-15",
    time: "10:00 AM",
    location: "Downtown Creative Hub",
    description: "Learn the latest digital art tools and techniques from industry professionals. This comprehensive workshop covers Adobe Creative Suite, Figma, and emerging AI-assisted design tools. Perfect for creators looking to enhance their digital skills and stay competitive in the market.",
    type: "creator",
    attendees: 45,
    maxAttendees: 60,
    thumbnail: eventPosterArt,
    price: "$75",
    speakers: [
      {
        name: "Sarah Chen",
        title: "Senior Digital Artist at CreativeStudio",
        bio: "Sarah has 8+ years of experience in digital art and has worked with brands like Nike and Apple. She specializes in creating stunning visuals using the latest digital tools."
      },
      {
        name: "Mike Rodriguez",
        title: "UX/UI Design Lead",
        bio: "Former Google designer with expertise in user experience and interface design. Mike will share insights on modern design workflows and tool efficiency."
      }
    ]
  },
  {
    id: "2",
    title: "Client Networking - Oct 10, 2025: Meet Top Talent",
    date: "2025-10-10",
    time: "6:00 PM",
    location: "Business District Conference Center",
    description: "An exclusive networking event for clients to connect with top creative talent. Meet award-winning designers, developers, and content creators. Includes portfolio showcases, one-on-one meetings, and collaborative project discussions.",
    type: "client",
    attendees: 78,
    maxAttendees: 100,
    thumbnail: eventPosterBusiness,
    price: "Free",
    speakers: [
      {
        name: "David Kim",
        title: "Creative Director at InnovateCorp",
        bio: "Award-winning creative director who has led campaigns for Fortune 500 companies. David will share insights on finding and working with top creative talent."
      },
      {
        name: "Lisa Thompson",
        title: "Startup Founder & CEO",
        bio: "Serial entrepreneur who has built three successful startups by leveraging creative talent. Lisa will discuss effective client-creator collaboration strategies."
      }
    ]
  },
  {
    id: "3",
    title: "Creator-Client Collaboration Summit 2025",
    date: "2025-11-20",
    time: "9:00 AM",
    location: "Convention Center",
    description: "A full-day summit bringing creators and clients together for workshops, networking, and collaboration opportunities. Features keynote presentations, breakout sessions, and hands-on collaboration workshops.",
    type: "both",
    attendees: 150,
    maxAttendees: 200,
    thumbnail: creativeWorkshop,
    price: "$125",
    speakers: [
      {
        name: "Jessica Wang",
        title: "Platform Strategy Director",
        bio: "Expert in creator economy trends and platform strategies. Jessica has helped thousands of creators and clients build successful partnerships."
      },
      {
        name: "Alex Morgan",
        title: "Creative Technology Consultant",
        bio: "Technology expert specializing in creative tools and workflow optimization. Alex helps teams leverage technology for better collaboration."
      }
    ]
  },
  {
    id: "4",
    title: "Photography Portfolio Mastery Workshop",
    date: "2025-12-05",
    time: "2:00 PM",
    location: "Art Gallery District",
    description: "Learn how to curate and present your photography portfolio to attract high-value clients. This workshop covers portfolio organization, client presentation techniques, and pricing strategies for photographers.",
    type: "creator",
    attendees: 20,
    maxAttendees: 30,
    thumbnail: creativeWorkshop,
    price: "$50",
    speakers: [
      {
        name: "Maria Santos",
        title: "Professional Photographer & Studio Owner",
        bio: "Award-winning photographer with 12+ years of experience. Maria specializes in commercial and portrait photography and has worked with major brands worldwide."
      }
    ]
  }
];

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<"all" | "creator" | "client" | "both">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchEvents = async () => {
      setLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(mockEvents);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    filter === "all" || event.type === filter
  );

  const handleRSVP = (eventId: string) => {
    // Placeholder for RSVP functionality
    console.log(`RSVP for event ${eventId}`);
    // In a real app, this would make an API call
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
                 style={{ backgroundImage: `url(${eventsBanner})` }}>
          <div className="absolute inset-0 bg-primary/60"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl mb-8">Connect, Learn, and Grow with Our Community</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Filter Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <img src={calendarIcon} alt="Calendar" className="w-8 h-8" />
              <h2 className="text-2xl font-semibold text-foreground">Browse Events</h2>
            </div>
            <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="creator">Creator-Focused</SelectItem>
                <SelectItem value="client">Client-Focused</SelectItem>
                <SelectItem value="both">Creator & Client</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardHeader>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-cover bg-center" 
                       style={{ backgroundImage: `url(${event.thumbnail})` }}>
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <Badge 
                        variant={event.type === "creator" ? "default" : event.type === "client" ? "secondary" : "outline"}
                        className="m-4"
                      >
                        {event.type === "both" ? "Creator & Client" : event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees} attendees</span>
                      </div>
                    </div>
                    
                    {/* Speakers Section */}
                    {event.speakers && event.speakers.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-foreground mb-3">Featured Speakers</h4>
                        <div className="space-y-3">
                          {event.speakers.map((speaker, index) => (
                            <div key={index} className="border-l-2 border-primary/30 pl-3">
                              <p className="font-medium text-foreground">{speaker.name}</p>
                              <p className="text-sm text-primary">{speaker.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">{speaker.bio}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
                      <span className="font-semibold text-primary text-lg">
                        {event.price}
                      </span>
                      <Button 
                        onClick={() => handleRSVP(event.id)}
                        variant="default"
                        size="sm"
                        className="px-6"
                      >
                        RSVP Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredEvents.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No events found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}