# Why use the system?

The system lets you quickly build custom UI components leveraging the values defined in your theme.

## Problem solved

The system focus on solving 3 main problems:

#### 1. Switching context wastes time.

There's no need to constantly jump between the usage of the styled components and where they are defined. With the system, those descriptions are right where you need them.

#### 2. Naming things is hard.

Have you ever found yourself struggling to find a good name for a styled component? The system maps the styles directly to the element. All you have to do is worry about actual style properties.

#### 3. Enforcing consistency in UIs is hard.

This is especially true when more than one person is building the application, as there has to be some coordination amongst members of the team regarding the choice of design tokens and how they are used, what parts of the theme structure should be used with what CSS properties, and so on.

The system provides direct access to the value in the theme. It makes it easier to design with constraints.

## When to use it?
- styled-components: the API is great to build components that need to support a wide variety of contexts. These components are used in many different parts of the application and support different combinations of props.

- system: the API is great to apply one-off styles. It's called "utility" for this reason.

## Responsive values

If you would like to have responsive values for a CSS property, you can use the breakpoints shorthand syntax. There are two ways of defining the breakpoints:

### 1. Breakpoints as an object

The first option for defining breakpoints is to define them as an object, using the breakpoints as keys. Note that each breakpoint property matches the breakpoint and every larger breakpoint. For example, `width: { lg: 100 }` is equivalent to `theme.breakpoints.lg`. Here is the previous example again, using the object syntax.

### 2. Breakpoints as an array

The second option is to define your breakpoints as an array, from the smallest to the largest breakpoint.

> You can skip breakpoints with the null value:
