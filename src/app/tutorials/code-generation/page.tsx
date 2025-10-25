import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('tutorials.code_generation')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function CodeGenerationTutorial() {
  const t = await getTranslations('tutorials.code_generation')
  const tCommon = await getTranslations('tutorials')
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tutorials">
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          {tCommon('back_to_tutorials')}
        </Link>
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-red-500">Advanced</Badge>
          <Badge variant="outline">{t('duration')}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Lightbulb className="w-5 h-5 text-primary" />
            {tCommon('what_you_learn')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_generation')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_review')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_debugging')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_testing')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('generating_code')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('perfect_prompt')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Write [LANGUAGE] code for [FUNCTIONALITY].

Requirements:
- [REQUIREMENT 1]
- [REQUIREMENT 2]
- [REQUIREMENT 3]

Constraints:
- [CONSTRAINT 1] (e.g., no external dependencies)
- [CONSTRAINT 2] (e.g., must be TypeScript)

Include:
- Type safety (if applicable)
- Error handling
- Input validation
- Clear comments
- Example usage

Tech stack: [FRAMEWORKS/LIBRARIES]`}
              />
            </CardContent>
          </Card>

          <Tabs defaultValue="bad" className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bad">❌ Vague Request</TabsTrigger>
              <TabsTrigger value="good">✅ Clear Request</TabsTrigger>
            </TabsList>
            <TabsContent value="bad">
              <Card>
                <CardContent className="pt-6">
                  <CodeBlock
                    language="text"
                    code="Write a function to validate emails"
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    Too vague - what language? What validation rules? Error handling?
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="good">
              <Card>
                <CardContent className="pt-6">
                  <CodeBlock
                    language="text"
                    code={`Write a TypeScript function to validate email addresses.

Requirements:
- Check for @ symbol
- Validate domain has at least one dot
- Reject emails with spaces
- Return boolean

Include:
- Type definition
- JSDoc comments
- 3 test cases (valid/invalid)

No external libraries.`}
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    Clear requirements = better code output!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">2. Code Review Prompts</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Comprehensive Code Review Template</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Review this [LANGUAGE] code for a [PURPOSE] feature.

Focus on:
1. Correctness & bugs
2. Performance & optimization
3. Security vulnerabilities
4. Code style & best practices
5. Error handling
6. Edge cases

Code:
\`\`\`[LANGUAGE]
[YOUR CODE]
\`\`\`

For each issue found, provide:
- Severity: Critical/High/Medium/Low
- Line numbers (if applicable)
- Explanation
- Suggested fix with code example

End with overall rating (1-10) and summary.`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specialized Review Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="security">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                </TabsList>

                <TabsContent value="security">
                  <CodeBlock
                    language="text"
                    code={`Perform a security audit of this code:

Check for:
- SQL injection vulnerabilities
- XSS attacks
- CSRF vulnerabilities
- Insecure dependencies
- Hardcoded secrets
- Improper authentication
- Authorization bypasses

Rate each: Safe / Potential Risk / Critical

Provide secure alternatives for any issues.`}
                  />
                </TabsContent>

                <TabsContent value="performance">
                  <CodeBlock
                    language="text"
                    code={`Analyze this code for performance:

Identify:
- Unnecessary re-renders (React)
- N+1 queries (Database)
- Memory leaks
- Inefficient algorithms
- Missing caching opportunities
- Bundle size issues

For each issue:
- Current Big O complexity
- Optimized approach
- Estimated improvement`}
                  />
                </TabsContent>

                <TabsContent value="react">
                  <CodeBlock
                    language="text"
                    code={`Review this React component:

Check:
- Proper use of hooks
- State management patterns
- Props validation
- Accessibility (a11y)
- Component composition
- Re-render optimization
- Error boundaries

Suggest improvements aligned with React best practices.`}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">3. Debugging with AI</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Debug Template</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Help me debug this [LANGUAGE] code.

Problem: [DESCRIBE THE ISSUE]

Expected behavior: [WHAT SHOULD HAPPEN]
Actual behavior: [WHAT IS HAPPENING]

Error message (if any):
\`\`\`
[ERROR MESSAGE]
\`\`\`

Code:
\`\`\`[LANGUAGE]
[CODE SNIPPET]
\`\`\`

Context:
- [RELEVANT CONTEXT 1]
- [RELEVANT CONTEXT 2]

Already tried:
- [ATTEMPTED FIX 1]
- [ATTEMPTED FIX 2]

Please:
1. Identify the root cause
2. Explain why it's happening
3. Provide a fix with explanation
4. Suggest how to prevent similar issues`}
              />
            </CardContent>
          </Card>

          <Alert>
            <Icons.Lightbulb className="w-4 h-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Include the full error stack trace and relevant environment info (Node version, browser, etc.)
            </AlertDescription>
          </Alert>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">4. Test Generation</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Unit Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Generate unit tests for this function:

\`\`\`[LANGUAGE]
[FUNCTION CODE]
\`\`\`

Use [TEST FRAMEWORK: Jest/Vitest/etc]

Include tests for:
- Happy path
- Edge cases
- Error conditions
- Boundary values

Format as [describe/it blocks]`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">E2E Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Create E2E tests for [USER FLOW]

Using: [Playwright/Cypress/etc]

User journey:
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]

Test for:
- Successful completion
- Error handling
- Loading states
- Accessibility`}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real Example: API Endpoint Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Generate Jest tests for this API endpoint:

\`\`\`typescript
async function createUser(req: Request, res: Response) {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await db.users.create({ email, name });
  return res.status(201).json(user);
}
\`\`\`

Test cases:
1. Valid user creation
2. Missing email field
3. Missing name field
4. Database error
5. Duplicate email

Mock the database calls.`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">5. Documentation Generation</h2>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Generate Docs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">JSDoc/TSDoc Comments</h4>
                <CodeBlock
                  language="text"
                  code={`Add comprehensive JSDoc comments to this code:

\`\`\`typescript
[YOUR CODE]
\`\`\`

Include:
- Function description
- @param for each parameter with type and description
- @returns with type and description
- @throws for possible errors
- @example with usage example`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">README Generation</h4>
                <CodeBlock
                  language="text"
                  code={`Create a README.md for this project:

Project: [NAME]
Description: [WHAT IT DOES]
Tech stack: [TECHNOLOGIES]

Include sections:
- Overview
- Installation
- Usage with examples
- API Reference
- Configuration
- Contributing
- License

Target audience: [DEVELOPERS/END-USERS/BOTH]`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">API Documentation</h4>
                <CodeBlock
                  language="text"
                  code={`Document this API:

\`\`\`typescript
[API CODE]
\`\`\`

Generate OpenAPI/Swagger spec including:
- Endpoint paths
- HTTP methods
- Request/response schemas
- Status codes
- Authentication requirements
- Example requests/responses`}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">6. Code Refactoring</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Refactoring Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Refactor this code to improve [ASPECT: readability/performance/maintainability]:

\`\`\`[LANGUAGE]
[CODE]
\`\`\`

Goals:
- [GOAL 1: e.g., reduce complexity]
- [GOAL 2: e.g., improve naming]
- [GOAL 3: e.g., extract reusable functions]

Constraints:
- Maintain exact same functionality
- [CONSTRAINT 2]

Provide:
1. Refactored code
2. Explanation of changes
3. Before/after comparison of key metrics`}
              />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Refactorings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Extract function</li>
                  <li>• Rename variables</li>
                  <li>• Remove duplication</li>
                  <li>• Simplify conditionals</li>
                  <li>• Replace magic numbers</li>
                  <li>• Improve error handling</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Design Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Refactor using [PATTERN]:
- Factory
- Singleton
- Observer
- Strategy
- Dependency Injection

Show before/after examples.`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">7. Code Translation</h2>

          <Card>
            <CardHeader>
              <CardTitle>Language Translation Template</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Convert this [SOURCE LANGUAGE] code to [TARGET LANGUAGE]:

\`\`\`[SOURCE]
[CODE]
\`\`\`

Requirements:
- Use idiomatic [TARGET] patterns
- Maintain same functionality
- Follow [TARGET] best practices
- Use [TARGET] standard library when possible

Explain significant differences in approach between the languages.`}
              />

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Example: Python to Rust</p>
                <p className="text-sm text-muted-foreground">
                  "Convert this Python data processing script to Rust. Use appropriate error handling with Result types and leverage Rust's ownership system for memory safety."
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  Do This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✓ Always specify the language/framework</li>
                  <li>✓ Provide full context and requirements</li>
                  <li>✓ Request comments and documentation</li>
                  <li>✓ Ask for error handling</li>
                  <li>✓ Specify coding style/conventions</li>
                  <li>✓ Review generated code carefully</li>
                  <li>✓ Test generated code thoroughly</li>
                  <li>✓ Iterate and refine</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  Avoid This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✗ Blindly copying generated code</li>
                  <li>✗ Ignoring security implications</li>
                  <li>✗ Skipping code review</li>
                  <li>✗ Not testing edge cases</li>
                  <li>✗ Using outdated patterns</li>
                  <li>✗ Generating without requirements</li>
                  <li>✗ Trusting complex logic without verification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                Practice Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Build a complete feature using AI assistance:</p>

              <div className="space-y-2 text-sm">
                <div>1. <strong>Generate:</strong> Create a user authentication system</div>
                <div>2. <strong>Review:</strong> Have AI review your implementation</div>
                <div>3. <strong>Test:</strong> Generate comprehensive tests</div>
                <div>4. <strong>Document:</strong> Create API docs and README</div>
                <div>5. <strong>Refactor:</strong> Optimize based on AI suggestions</div>
              </div>

              <Alert className="mt-4">
                <Icons.Target className="w-4 h-4" />
                <AlertDescription>
                  Challenge: Complete this in under 2 hours using AI assistance!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        <Card className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5 text-primary" />
              {tCommon('next_steps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild>
                <Link href="/tutorials/multi-agent-systems">
                  Multi-Agent Systems →
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tutorials">
                  ← Back to All Tutorials
                </Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Continue Learning:</p>
              <ul className="space-y-1">
                <li>• Practice with real projects</li>
                <li>• Share your best prompts in the <Link href="/prompts/new" className="text-primary hover:underline">community</Link></li>
                <li>• Join <Link href="/challenges" className="text-primary hover:underline">coding challenges</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
