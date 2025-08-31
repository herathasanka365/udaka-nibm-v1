import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, MapPin, Mail, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import exploreBanner from "@/assets/explore-banner.jpg";
import creatorProfile from "@/assets/creator-profile.jpg";
import clientProject from "@/assets/client-project.jpg";

interface Creator {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  bio: string;
  skills: string[];
  avatar: string;
  portfolio: string[];
  portfolioLink?: string;
}

interface Client {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  projectCount: number;
  description: string;
  industries: string[];
  avatar: string;
  recentProject: string;
  budget?: string;
  projectType?: string;
}

const mockCreators: Creator[] = [
  {
    id: "1",
    name: "ArtistY",
    category: "Art",
    location: "New York, NY",
    rating: 4.8,
    reviewCount: 127,
    bio: "Creative digital artist specializing in vibrant illustrations and brand identity design. Passionate about bringing unique visions to life through innovative digital art.",
    skills: ["Digital Art", "Illustration", "Brand Design", "Adobe Creative Suite"],
    avatar: creatorProfile,
    portfolio: [creatorProfile],
    portfolioLink: "portfolio.link.com"
  },
  {
    id: "2",
    name: "TechMaster Pro",
    category: "Tech",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 89,
    bio: "Full-stack developer specializing in modern web applications and mobile development. Expert in React, Node.js, and cloud technologies.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Mobile Development"],
    avatar: creatorProfile,
    portfolio: [creatorProfile],
    portfolioLink: "github.com/techmasterpro"
  },
  {
    id: "3",
    name: "DesignGuru",
    category: "Art",
    location: "Los Angeles, CA",
    rating: 5.0,
    reviewCount: 156,
    bio: "Award-winning UI/UX designer with a passion for creating intuitive and beautiful user experiences. Specialized in modern interface design.",
    skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
    avatar: creatorProfile,
    portfolio: [creatorProfile],
    portfolioLink: "designguru.portfolio.com"
  },
  {
    id: "4",
    name: "CodeNinja",
    category: "Tech", 
    location: "Austin, TX",
    rating: 4.7,
    reviewCount: 203,
    bio: "Backend specialist and DevOps engineer with expertise in scalable system architecture and cloud infrastructure management.",
    skills: ["Python", "Docker", "Kubernetes", "DevOps", "System Architecture"],
    avatar: creatorProfile,
    portfolio: [creatorProfile],
    portfolioLink: "codeninja.dev"
  },
  {
    id: "5",
    name: "Creative Maven",
    category: "Art",
    location: "Chicago, IL", 
    rating: 4.6,
    reviewCount: 78,
    bio: "Multidisciplinary creative specializing in photography, video production, and content creation for brands and social media.",
    skills: ["Photography", "Video Production", "Content Creation", "Social Media"],
    avatar: creatorProfile,
    portfolio: [creatorProfile],
    portfolioLink: "creativemaven.com"
  }
];

const mockClients: Client[] = [
  {
    id: "1",
    name: "CompanyZ",
    company: "Technology Innovators",
    location: "Austin, TX",
    rating: 4.7,
    projectCount: 24,
    description: "Fast-growing tech startup looking for creative talent to bring innovative ideas to life. We value creativity and cutting-edge design.",
    industries: ["Technology", "Software", "Innovation"],
    avatar: clientProject,
    recentProject: clientProject,
    budget: "$5,000",
    projectType: "App Design"
  },
  {
    id: "2",
    name: "DesignFirst Agency",
    company: "Creative Marketing",
    location: "Chicago, IL",
    rating: 4.9,
    projectCount: 67,
    description: "Leading creative agency serving Fortune 500 companies worldwide. We're always looking for top-tier creative professionals.",
    industries: ["Marketing", "Advertising", "Branding"],
    avatar: clientProject,
    recentProject: clientProject,
    budget: "$8,000",
    projectType: "Brand Identity"
  },
  {
    id: "3",
    name: "StartupVentures",
    company: "Venture Capital",
    location: "San Francisco, CA", 
    rating: 4.5,
    projectCount: 45,
    description: "We help startups scale by connecting them with exceptional creative talent. Multiple projects available across various industries.",
    industries: ["Venture Capital", "Startups", "Technology"],
    avatar: clientProject,
    recentProject: clientProject,
    budget: "$12,000",
    projectType: "Website Development"
  }
];

export default function Explore() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCreators(mockCreators);
      setClients(mockClients);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredCreators = creators.filter(creator =>
    (creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (categoryFilter === "all" || creator.category.toLowerCase() === categoryFilter.toLowerCase())
  );

  const filteredClients = clients.filter(client =>
    (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industries.some(industry => industry.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (categoryFilter === "all" || client.industries.some(industry => industry.toLowerCase() === categoryFilter.toLowerCase()))
  );

  const handleContact = (id: string, type: "creator" | "client") => {
    console.log(`Contact ${type} ${id}`);
    // In a real app, this would open a contact modal or redirect to a contact page
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
                 style={{ backgroundImage: `url(${exploreBanner})` }}>
          <div className="absolute inset-0 bg-primary/60"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Explore Talent & Opportunities</h1>
            <p className="text-xl mb-8">Discover amazing creators and exciting projects</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search creators, clients, skills, or industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-6"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                onClick={() => setCategoryFilter("all")}
                size="sm"
              >
                All Categories
              </Button>
              <Button
                variant={categoryFilter === "art" ? "default" : "outline"}
                onClick={() => setCategoryFilter("art")}
                size="sm"
              >
                Art & Design
              </Button>
              <Button
                variant={categoryFilter === "tech" ? "default" : "outline"}
                onClick={() => setCategoryFilter("tech")}
                size="sm"
              >
                Technology
              </Button>
              <Button
                variant={categoryFilter === "marketing" ? "default" : "outline"}
                onClick={() => setCategoryFilter("marketing")}
                size="sm"
              >
                Marketing
              </Button>
            </div>
          </div>

          {/* Tabs for Creators and Clients */}
          <Tabs defaultValue="creators" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="creators">Creators</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>

            {/* Creators Tab */}
            <TabsContent value="creators">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Talented Creators ({filteredCreators.length})
                </h2>
                <p className="text-muted-foreground">
                  Discover skilled professionals ready to bring your projects to life
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="animate-pulse">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-3/4"></div>
                        </div>
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
                  {filteredCreators.map((creator) => (
                    <Card key={creator.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <img 
                          src={creator.avatar} 
                          alt={creator.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <CardTitle className="text-lg">{creator.name}</CardTitle>
                          <CardDescription>{creator.category}</CardDescription>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{creator.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({creator.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{creator.location}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {creator.bio}
                        </p>
                        
                        {creator.portfolioLink && (
                          <p className="text-sm text-primary">
                            Portfolio: {creator.portfolioLink}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-1">
                          {creator.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {creator.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{creator.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => handleContact(creator.id, "creator")}
                          className="w-full"
                          variant="default"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Contact Creator
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredCreators.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No creators found matching your search.</p>
                </div>
              )}
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Active Clients ({filteredClients.length})
                </h2>
                <p className="text-muted-foreground">
                  Connect with clients looking for creative talent
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <Card key={index} className="animate-pulse">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-3/4"></div>
                        </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredClients.map((client) => (
                    <Card key={client.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <img 
                          src={client.avatar} 
                          alt={client.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <CardDescription>{client.company}</CardDescription>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{client.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({client.projectCount} projects)
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{client.location}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {client.description}
                        </p>
                        
                        {client.budget && client.projectType && (
                          <p className="text-sm text-primary">
                            Project: {client.projectType} - Budget: {client.budget}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-1">
                          {client.industries.map((industry) => (
                            <Badge key={industry} variant="secondary" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            onClick={() => handleContact(client.id, "client")}
                            variant="default"
                            size="sm"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                          >
                            View Projects
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredClients.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No clients found matching your search.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}