'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ComponentPreview } from '@/components/design-system/component-preview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Heart,
  Share2,
  Bookmark,
  Bold,
  Italic,
  Underline,
} from 'lucide-react'
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
} from '@/lib/animations'

export default function DesignSystemNewPage() {
  const { toast } = useToast()
  const [progress, setProgress] = useState(45)
  const [sliderValue, setSliderValue] = useState([50])

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mb-16"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Design System
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A comprehensive library of components, animations, and design patterns built with Shadcn UI, Tailwind CSS, and Framer Motion.
        </p>
      </motion.div>

      {/* Quick Navigation */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mb-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
      >
        {[
          'Animations',
          'Buttons',
          'Inputs',
          'Cards',
          'Alerts',
          'Badges',
          'Avatars',
          'Progress',
          'Tooltips',
          'Accordions',
          'Tabs',
          'Toggles',
        ].map((item) => (
          <motion.a
            key={item}
            variants={staggerItem}
            href={`#${item.toLowerCase()}`}
            className="text-sm px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-center transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>

      <Separator className="my-12" />

      {/* Animations Section */}
      <section id="animations" className="mb-20">
        <motion.div initial="hidden" animate="visible" variants={fadeInLeft}>
          <h2 className="text-4xl font-bold mb-6">Animations</h2>
          <p className="text-muted-foreground mb-8">
            Powered by Framer Motion with custom presets for consistent, delightful animations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Fade In Up */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fade In Up</CardTitle>
              <CardDescription>Smooth entrance from below</CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center">
              <motion.div
                key={Date.now()}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="w-20 h-20 bg-primary rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Scale In */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scale In</CardTitle>
              <CardDescription>Bouncy scale entrance</CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center">
              <motion.div
                key={Date.now() + 1}
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                className="w-20 h-20 bg-purple-600 rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Hover Scale */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hover Scale</CardTitle>
              <CardDescription>Interactive hover effect</CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center">
              <motion.div
                variants={hoverScale}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="w-20 h-20 bg-green-600 rounded-lg cursor-pointer"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <ComponentPreview
            title="Stagger Animation Example"
            description="Children animate in sequence"
            code={`import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
  className="flex gap-4"
>
  {items.map((item) => (
    <motion.div key={item} variants={staggerItem}>
      {item}
    </motion.div>
  ))}
</motion.div>`}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex gap-4"
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div
                  key={item}
                  variants={staggerItem}
                  className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white font-bold"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </ComponentPreview>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Buttons Section */}
      <section id="buttons" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Buttons</h2>
        <p className="text-muted-foreground mb-8">
          Versatile button component with multiple variants and sizes.
        </p>

        <div className="space-y-8">
          <ComponentPreview
            title="Button Variants"
            description="Different button styles for different contexts"
            code={`import { Button } from '@/components/ui/button'

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`}
          >
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Button Sizes"
            description="Small, default, and large button sizes"
            code={`<Button size="sm">Small</Button>
<Button size="md">Default</Button>
<Button size="lg">Large</Button>`}
          >
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Button with Icons"
            description="Combine buttons with Lucide icons"
            code={`import { Heart, Share2, Bookmark } from 'lucide-react'

<Button><Heart className="w-4 h-4 mr-2" />Like</Button>
<Button variant="outline"><Share2 className="w-4 h-4 mr-2" />Share</Button>
<Button variant="ghost"><Bookmark className="w-4 h-4 mr-2" />Save</Button>`}
          >
            <div className="flex gap-4">
              <Button>
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Inputs Section */}
      <section id="inputs" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Form Inputs</h2>
        <p className="text-muted-foreground mb-8">
          Input components for forms and user data entry.
        </p>

        <div className="space-y-8">
          <ComponentPreview
            title="Text Input"
            description="Basic text input with label"
            code={`import { Input } from '@/components/ui/input'

<div className="space-y-2">
  <label className="text-sm font-medium">Email</label>
  <Input type="email" placeholder="your@email.com" />
</div>`}
          >
            <div className="w-full max-w-sm space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Textarea"
            description="Multi-line text input"
            code={`import { Textarea } from '@/components/ui/textarea'

<Textarea placeholder="Enter your prompt..." rows={4} />`}
          >
            <div className="w-full max-w-sm">
              <Textarea placeholder="Enter your prompt..." rows={4} />
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Select"
            description="Dropdown selection"
            code={`import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="chatgpt">ChatGPT</SelectItem>
    <SelectItem value="claude">Claude</SelectItem>
    <SelectItem value="gemini">Gemini</SelectItem>
  </SelectContent>
</Select>`}
          >
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chatgpt">ChatGPT</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="gemini">Gemini</SelectItem>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Cards Section */}
      <section id="cards" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Cards</h2>
        <p className="text-muted-foreground mb-8">
          Card components for displaying grouped content.
        </p>

        <ComponentPreview
          title="Basic Card"
          description="Card with header, content, and footer"
          code={`import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content and main information.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content and main information.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </section>

      <Separator className="my-12" />

      {/* Alerts Section */}
      <section id="alerts" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Alerts</h2>
        <p className="text-muted-foreground mb-8">
          Alert components for important messages and notifications.
        </p>

        <div className="space-y-4 max-w-2xl">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert message.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-600 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Success</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300">
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>

          <Alert className="border-yellow-600 bg-yellow-50 dark:bg-yellow-950">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-600">Warning</AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-300">
              This action requires admin privileges.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Badges Section */}
      <section id="badges" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Badges</h2>
        <p className="text-muted-foreground mb-8">
          Small status indicators and labels.
        </p>

        <ComponentPreview
          title="Badge Variants"
          description="Different badge styles"
          code={`import { Badge } from '@/components/ui/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}
        >
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </ComponentPreview>
      </section>

      <Separator className="my-12" />

      {/* Avatars Section */}
      <section id="avatars" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Avatars</h2>
        <p className="text-muted-foreground mb-8">
          User profile pictures and initials.
        </p>

        <ComponentPreview
          title="Avatar Examples"
          description="With image and with fallback"
          code={`import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`}
        >
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
          </div>
        </ComponentPreview>
      </section>

      <Separator className="my-12" />

      {/* Progress Section */}
      <section id="progress" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Progress & Sliders</h2>
        <p className="text-muted-foreground mb-8">
          Progress indicators and range inputs.
        </p>

        <div className="space-y-8">
          <ComponentPreview
            title="Progress Bar"
            description="Visual progress indicator"
            code={`import { Progress } from '@/components/ui/progress'

const [progress, setProgress] = useState(45)

<Progress value={progress} />`}
          >
            <div className="w-full max-w-sm space-y-4">
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                  -10%
                </Button>
                <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                  +10%
                </Button>
              </div>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Slider"
            description="Range input slider"
            code={`import { Slider } from '@/components/ui/slider'

const [value, setValue] = useState([50])

<Slider value={value} onValueChange={setValue} max={100} step={1} />`}
          >
            <div className="w-full max-w-sm space-y-4">
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
              />
              <p className="text-sm text-muted-foreground">Value: {sliderValue[0]}</p>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Tooltips Section */}
      <section id="tooltips" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Tooltips</h2>
        <p className="text-muted-foreground mb-8">
          Helpful hints that appear on hover.
        </p>

        <ComponentPreview
          title="Tooltip Example"
          description="Hover over the button to see the tooltip"
          code={`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a helpful tooltip!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a helpful tooltip!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ComponentPreview>
      </section>

      <Separator className="my-12" />

      {/* Accordions Section */}
      <section id="accordions" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Accordions</h2>
        <p className="text-muted-foreground mb-8">
          Collapsible content sections.
        </p>

        <ComponentPreview
          title="Accordion Example"
          description="Click to expand and collapse sections"
          code={`import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match our design system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default with smooth transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </section>

      <Separator className="my-12" />

      {/* Tabs Section */}
      <section id="tabs" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Tabs</h2>
        <p className="text-muted-foreground mb-8">
          Navigate between different views.
        </p>

        <ComponentPreview
          title="Tabs Example"
          description="Switch between different content sections"
          code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>`}
        >
          <div className="w-full max-w-md">
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Manage your account settings here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Account content goes here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Password content goes here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                      Adjust your preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Settings content goes here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ComponentPreview>
      </section>

      <Separator className="my-12" />

      {/* Toggles Section */}
      <section id="toggles" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Toggles & Switches</h2>
        <p className="text-muted-foreground mb-8">
          Toggle buttons and switches for binary options.
        </p>

        <div className="space-y-8">
          <ComponentPreview
            title="Switch"
            description="Toggle switch component"
            code={`import { Switch } from '@/components/ui/switch'

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode">Airplane Mode</label>
</div>`}
          >
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <label htmlFor="airplane-mode">Airplane Mode</label>
            </div>
          </ComponentPreview>

          <ComponentPreview
            title="Toggle"
            description="Toggle button"
            code={`import { Toggle } from '@/components/ui/toggle'
import { Bold } from 'lucide-react'

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`}
          >
            <Toggle aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </Toggle>
          </ComponentPreview>

          <ComponentPreview
            title="Toggle Group"
            description="Group of toggle buttons"
            code={`import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

<ToggleGroup type="single">
  <ToggleGroupItem value="bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
</ToggleGroup>`}
          >
            <ToggleGroup type="single">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </ComponentPreview>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Toast Demo Section */}
      <section id="toast" className="mb-20">
        <h2 className="text-4xl font-bold mb-6">Toast Notifications</h2>
        <p className="text-muted-foreground mb-8">
          Temporary notifications that appear at the corner of the screen.
        </p>

        <ComponentPreview
          title="Toast Examples"
          description="Click the buttons to trigger different toast notifications"
          code={`import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

toast({
  title: "Success!",
  description: "Your prompt has been saved.",
})

toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong.",
})`}
        >
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() =>
                toast({
                  title: 'Success!',
                  description: 'Your prompt has been saved.',
                })
              }
            >
              Show Success Toast
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast({
                  variant: 'destructive',
                  title: 'Error',
                  description: 'Something went wrong.',
                })
              }
            >
              Show Error Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Info',
                  description: 'This is an informational message.',
                })
              }
            >
              Show Info Toast
            </Button>
          </div>
        </ComponentPreview>
      </section>

      {/* Footer */}
      <div className="mt-20 pt-12 border-t">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <h3 className="text-2xl font-bold mb-4">Resources</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shadcn UI</CardTitle>
                <CardDescription>Component library</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ui.shadcn.com →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Framer Motion</CardTitle>
                <CardDescription>Animation library</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="https://www.framer.com/motion/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  framer.com/motion →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tailwind CSS</CardTitle>
                <CardDescription>Utility-first CSS</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  tailwindcss.com →
                </a>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
