// Component library metadata for UI checker
// This file defines all components with their props, variants, and examples

import Button from '../components/atoms/Button/Button';
import Input from '../components/atoms/Input/Input';
import Label from '../components/atoms/Label/Label';
import Icon from '../components/atoms/Icon/Icon';
import Counter from '../components/atoms/Counter/Counter';
import CallToAction from '../components/atoms/CallToAction/CallToAction';
import StudentStatus from '../components/atoms/StudentStatus/StudentStatus';
import StatusRoot from '../components/atoms/StatusRoot/StatusRoot';
import LudoraLogo from '../components/atoms/LudoraLogo/LudoraLogo';
import FormField from '../components/molecules/FormField/FormField';
import RoleCard from '../components/molecules/RoleCard/RoleCard';
import SidebarMenuItem from '../components/molecules/SidebarMenuItem/SidebarMenuItem';
import LoginForm from '../components/organisms/LoginForm/LoginForm';
import SideDropMenu from '../components/organisms/SideDropMenu/SideDropMenu';

export const componentLibrary = {
  atoms: [
    {
      id: 'button',
      name: 'Button',
      category: 'atoms',
      component: Button,
      description: 'A versatile button component with multiple variants and sizes',
      props: {
        children: { type: 'string', default: 'Click me', examples: ['Click me', 'Submit', 'Cancel'] },
        variant: { type: 'select', default: 'primary', options: ['primary', 'secondary', 'outline', 'ghost'] },
        size: { type: 'select', default: 'medium', options: ['small', 'medium', 'large'] },
        disabled: { type: 'boolean', default: false },
        fullWidth: { type: 'boolean', default: false },
        onClick: { type: 'function', default: () => console.log('Clicked') }
      }
    },
    {
      id: 'input',
      name: 'Input',
      category: 'atoms',
      component: Input,
      description: 'Text input field with error handling',
      props: {
        type: { type: 'select', default: 'text', options: ['text', 'email', 'password', 'number', 'tel'] },
        placeholder: { type: 'string', default: 'Enter text...', examples: ['Enter text...', 'Email address', 'Password'] },
        value: { type: 'string', default: '', examples: ['', 'Sample text', 'user@example.com'] },
        disabled: { type: 'boolean', default: false },
        error: { type: 'string', default: '', examples: ['', 'This field is required', 'Invalid email'] },
        required: { type: 'boolean', default: false }
      }
    },
    {
      id: 'label',
      name: 'Label',
      category: 'atoms',
      component: Label,
      description: 'Form label with optional required indicator',
      props: {
        children: { type: 'string', default: 'Label', examples: ['Label', 'Email', 'Password', 'First Name'] },
        required: { type: 'boolean', default: false },
        htmlFor: { type: 'string', default: 'input-id' }
      }
    },
    {
      id: 'icon',
      name: 'Icon',
      category: 'atoms',
      component: Icon,
      description: 'Icon component using Lucide React icons',
      props: {
        name: { type: 'select', default: 'circle', options: ['circle', 'checkCircle', 'checkCircle2', 'plus', 'chevronDown', 'listTodo', 'activities'] },
        size: { type: 'number', default: 24, min: 16, max: 48, step: 4 },
        color: { type: 'string', default: 'var(--color-cloud-40)', examples: ['var(--color-cloud-40)', '#6366f1', '#ef4444', '#10b981'] }
      }
    },
    {
      id: 'counter',
      name: 'Counter',
      category: 'atoms',
      component: Counter,
      description: 'Badge counter component for displaying counts',
      props: {
        count: { type: 'number', default: 0, min: 0, max: 999 },
        variant: { type: 'select', default: 'default', options: ['default'] }
      }
    },
    {
      id: 'callToAction',
      name: 'CallToAction',
      category: 'atoms',
      component: CallToAction,
      description: 'Call-to-action button with multiple variants and states',
      props: {
        children: { type: 'string', default: 'Placeholder', examples: ['Placeholder', 'Get Started', 'Learn More', 'Sign Up'] },
        variant: { type: 'select', default: 'primary', options: ['primary', 'secondary', 'tertiary'] },
        state: { type: 'select', default: 'idle', options: ['idle', 'hover', 'pressed'] },
        disabled: { type: 'boolean', default: false },
        selected: { type: 'boolean', default: false },
        showBelow: { type: 'boolean', default: false }
      }
    },
    {
      id: 'studentStatus',
      name: 'StudentStatus',
      category: 'atoms',
      component: StudentStatus,
      description: 'Status indicator for student progress',
      props: {
        content: { type: 'string', default: 'Placeholder Text', examples: ['Placeholder Text', 'On Track', 'Needs Attention', 'Completed'] },
        breakpoint: { type: 'select', default: '1920', options: ['320', '1920'] },
        variant: { type: 'select', default: 'Primary', options: ['Primary', 'Secondary'] },
        iconName: { type: 'select', default: 'circleCheckBig', options: ['circleCheckBig', 'circleCheck', 'circle'] }
      }
    },
    {
      id: 'statusRoot',
      name: 'StatusRoot',
      category: 'atoms',
      component: StatusRoot,
      description: 'Root status component with icon and text',
      props: {
        content: { type: 'string', default: 'Placeholder Text', examples: ['Placeholder Text', 'Active', 'Inactive', 'Pending'] },
        text: { type: 'boolean', default: true },
        variant: { type: 'select', default: 'Primary', options: ['Primary', 'Secondary'] },
        iconName: { type: 'select', default: 'circleCheckBig', options: ['circleCheckBig', 'circleCheck', 'circle'] }
      }
    },
    {
      id: 'ludoraLogo',
      name: 'LudoraLogo',
      category: 'atoms',
      component: LudoraLogo,
      description: 'Ludora brand logo component',
      props: {}
    }
  ],
  molecules: [
    {
      id: 'formField',
      name: 'FormField',
      category: 'molecules',
      component: FormField,
      description: 'Combined label and input field component',
      props: {
        label: { type: 'string', default: 'Label', examples: ['Label', 'Email', 'Password', 'First Name'] },
        name: { type: 'string', default: 'field', examples: ['field', 'email', 'password'] },
        type: { type: 'select', default: 'text', options: ['text', 'email', 'password', 'number'] },
        placeholder: { type: 'string', default: 'Enter value...', examples: ['Enter value...', 'Email address'] },
        value: { type: 'string', default: '', examples: ['', 'Sample text', 'user@example.com'] },
        required: { type: 'boolean', default: false },
        error: { type: 'string', default: '', examples: ['', 'This field is required'] }
      }
    },
    {
      id: 'roleCard',
      name: 'RoleCard',
      category: 'molecules',
      component: RoleCard,
      description: 'Card component for role selection',
      props: {
        title: { type: 'string', default: 'Role', examples: ['Role', 'Teacher', 'Parent', 'Student'] },
        icon: { type: 'element', default: null }
      }
    },
    {
      id: 'sidebarMenuItem',
      name: 'SidebarMenuItem',
      category: 'molecules',
      component: SidebarMenuItem,
      description: 'Menu item for sidebar navigation',
      props: {
        label: { type: 'string', default: 'Menu Item', examples: ['Menu Item', 'Activities', 'Dashboard', 'Settings'] },
        icon: { type: 'select', default: 'activities', options: ['activities', 'circle', 'checkCircle'] },
        count: { type: 'number', default: null, examples: [null, 0, 5, 12, 99] },
        isSelected: { type: 'boolean', default: false },
        isHover: { type: 'boolean', default: false },
        hasIcon: { type: 'boolean', default: true }
      }
    }
  ],
  organisms: [
    {
      id: 'loginForm',
      name: 'LoginForm',
      category: 'organisms',
      component: LoginForm,
      description: 'Complete login form with validation',
      props: {
        onSubmit: { type: 'function', default: (data) => console.log('Form submitted:', data) },
        isLoading: { type: 'boolean', default: false }
      }
    },
    {
      id: 'sideDropMenu',
      name: 'SideDropMenu',
      category: 'organisms',
      component: SideDropMenu,
      description: 'Collapsible sidebar menu with items',
      props: {
        title: { type: 'string', default: 'Activités', examples: ['Activités', 'Dashboard', 'Settings'] },
        isOpen: { type: 'boolean', default: false },
        leadingIcon: { type: 'select', default: 'activities', options: ['activities', 'circle', 'checkCircle'] },
        items: { 
          type: 'array', 
          default: [
            { id: '1', label: 'Item 1', icon: 'circle', count: 5, isSelected: false },
            { id: '2', label: 'Item 2', icon: 'circle', count: null, isSelected: true }
          ]
        }
      }
    }
  ]
};

// Helper function to get all components
export const getAllComponents = () => {
  return [
    ...componentLibrary.atoms,
    ...componentLibrary.molecules,
    ...componentLibrary.organisms
  ];
};

// Helper function to get component by id
export const getComponentById = (id) => {
  const allComponents = getAllComponents();
  return allComponents.find(comp => comp.id === id);
};
