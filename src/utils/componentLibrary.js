// Component library metadata for UI checker
// This file defines all components with their props, variants, and examples

import Button from "../components/atoms/Button/Button";
import Input from "../components/atoms/Input/Input";
import Label from "../components/atoms/Label/Label";
import Icon from "../components/atoms/Icon/Icon";
import Counter from "../components/atoms/Counter/Counter";
import CallToAction from "../components/atoms/CallToAction/CallToAction";
import StudentStatus from "../components/atoms/StudentStatus/StudentStatus";
import StatusRoot from "../components/atoms/StatusRoot/StatusRoot";
import LudoraLogo from "../components/atoms/LudoraLogo/LudoraLogo";
import FilterPill from "../components/atoms/FilterPill/FilterPill";
import TabItem from "../components/atoms/TabItem/TabItem";
import FormField from "../components/molecules/FormField/FormField";
import RoleCard from "../components/molecules/RoleCard/RoleCard";
import SidebarMenuItem from "../components/molecules/SidebarMenuItem/SidebarMenuItem";
import StudentInfo from "../components/molecules/StudentInfo/StudentInfo";
import ActivityBreadcrumb from "../components/molecules/ActivityBreadcrumb/ActivityBreadcrumb";
import ScoreBadge from "../components/molecules/ScoreBadge/ScoreBadge";
import LoginForm from "../components/organisms/LoginForm/LoginForm";
import SideDropMenu from "../components/organisms/SideDropMenu/SideDropMenu";
import SideNav from "../components/organisms/SideNav/SideNav";
import NotesTableRow from "../components/organisms/NotesTableRow/NotesTableRow";
import NotesFilterBar from "../components/organisms/NotesFilterBar/NotesFilterBar";
import NotesPage from "../pages/NotesPage/NotesPage";

export const componentLibrary = {
    atoms: [
        {
            id: "button",
            name: "Button",
            category: "atoms",
            component: Button,
            description:
                "A versatile button component with multiple variants and sizes",
            props: {
                children: {
                    type: "string",
                    default: "Click me",
                    examples: ["Click me", "Submit", "Cancel"],
                },
                variant: {
                    type: "select",
                    default: "primary",
                    options: ["primary", "secondary", "outline", "ghost"],
                },
                size: {
                    type: "select",
                    default: "medium",
                    options: ["small", "medium", "large"],
                },
                disabled: { type: "boolean", default: false },
                fullWidth: { type: "boolean", default: false },
                onClick: {
                    type: "function",
                    default: () => console.log("Clicked"),
                },
            },
        },
        {
            id: "input",
            name: "Input",
            category: "atoms",
            component: Input,
            description: "Text input field with error handling",
            props: {
                type: {
                    type: "select",
                    default: "text",
                    options: ["text", "email", "password", "number", "tel"],
                },
                placeholder: {
                    type: "string",
                    default: "Enter text...",
                    examples: ["Enter text...", "Email address", "Password"],
                },
                value: {
                    type: "string",
                    default: "",
                    examples: ["", "Sample text", "user@example.com"],
                },
                disabled: { type: "boolean", default: false },
                error: {
                    type: "string",
                    default: "",
                    examples: ["", "This field is required", "Invalid email"],
                },
                required: { type: "boolean", default: false },
            },
        },
        {
            id: "label",
            name: "Label",
            category: "atoms",
            component: Label,
            description: "Form label with optional required indicator",
            props: {
                children: {
                    type: "string",
                    default: "Label",
                    examples: ["Label", "Email", "Password", "First Name"],
                },
                required: { type: "boolean", default: false },
                htmlFor: { type: "string", default: "input-id" },
            },
        },
        {
            id: "icon",
            name: "Icon",
            category: "atoms",
            component: Icon,
            description: "Icon component using Lucide React icons",
            props: {
                name: {
                    type: "select",
                    default: "circle",
                    options: [
                        "circle",
                        "checkCircle",
                        "checkCircle2",
                        "plus",
                        "chevronDown",
                        "listTodo",
                        "activities",
                    ],
                },
                size: {
                    type: "number",
                    default: 24,
                    min: 16,
                    max: 48,
                    step: 4,
                },
                color: {
                    type: "string",
                    default: "var(--color-cloud-40)",
                    examples: [
                        "var(--color-cloud-40)",
                        "#6366f1",
                        "#ef4444",
                        "#10b981",
                    ],
                },
            },
        },
        {
            id: "counter",
            name: "Counter",
            category: "atoms",
            component: Counter,
            description: "Badge counter component for displaying counts",
            props: {
                count: { type: "number", default: 0, min: 0, max: 999 },
                variant: {
                    type: "select",
                    default: "default",
                    options: ["default"],
                },
            },
        },
        {
            id: "callToAction",
            name: "CallToAction",
            category: "atoms",
            component: CallToAction,
            description:
                "Call-to-action button with multiple variants and states",
            props: {
                children: {
                    type: "string",
                    default: "Placeholder",
                    examples: [
                        "Placeholder",
                        "Get Started",
                        "Learn More",
                        "Sign Up",
                    ],
                },
                variant: {
                    type: "select",
                    default: "primary",
                    options: ["primary", "secondary", "tertiary"],
                },
                state: {
                    type: "select",
                    default: "idle",
                    options: ["idle", "hover", "pressed"],
                },
                disabled: { type: "boolean", default: false },
                selected: { type: "boolean", default: false },
                showBelow: { type: "boolean", default: false },
            },
        },
        {
            id: "studentStatus",
            name: "StudentStatus",
            category: "atoms",
            component: StudentStatus,
            description: "Status indicator for student progress",
            props: {
                content: {
                    type: "string",
                    default: "Placeholder Text",
                    examples: [
                        "Placeholder Text",
                        "On Track",
                        "Needs Attention",
                        "Completed",
                    ],
                },
                breakpoint: {
                    type: "select",
                    default: "1920",
                    options: ["320", "1920"],
                },
                variant: {
                    type: "select",
                    default: "Primary",
                    options: ["Primary", "Secondary"],
                },
                iconName: {
                    type: "select",
                    default: "circleCheckBig",
                    options: ["circleCheckBig", "circleCheck", "circle"],
                },
            },
        },
        {
            id: "statusRoot",
            name: "StatusRoot",
            category: "atoms",
            component: StatusRoot,
            description: "Root status component with icon and text",
            props: {
                content: {
                    type: "string",
                    default: "Placeholder Text",
                    examples: [
                        "Placeholder Text",
                        "Active",
                        "Inactive",
                        "Pending",
                    ],
                },
                text: { type: "boolean", default: true },
                variant: {
                    type: "select",
                    default: "Primary",
                    options: ["Primary", "Secondary"],
                },
                iconName: {
                    type: "select",
                    default: "circleCheckBig",
                    options: ["circleCheckBig", "circleCheck", "circle"],
                },
            },
        },
        {
            id: "ludoraLogo",
            name: "LudoraLogo",
            category: "atoms",
            component: LudoraLogo,
            description: "Ludora brand logo component",
            props: {},
        },
        {
            id: "filterPill",
            name: "FilterPill",
            category: "atoms",
            component: FilterPill,
            description: "Dropdown filter button with chevron icon",
            props: {
                label: {
                    type: "string",
                    default: "Filter",
                    examples: ["Filter", "Classe(s)", "Type d'activités", "Diagnostic"],
                },
                onClick: {
                    type: "function",
                    default: () => console.log("Filter clicked"),
                },
            },
        },
        {
            id: "tabItem",
            name: "TabItem",
            category: "atoms",
            component: TabItem,
            description: "Navigation tab item with active state indicator",
            props: {
                label: {
                    type: "string",
                    default: "Tab",
                    examples: ["Tab", "Toutes les notes", "Calculées", "A faire", "En attente"],
                },
                active: {
                    type: "boolean",
                    default: false,
                },
                showIcon: {
                    type: "boolean",
                    default: false,
                },
                onClick: {
                    type: "function",
                    default: () => console.log("Tab clicked"),
                },
            },
        },
    ],
    molecules: [
        {
            id: "formField",
            name: "FormField",
            category: "molecules",
            component: FormField,
            description: "Combined label and input field component",
            props: {
                label: {
                    type: "string",
                    default: "Label",
                    examples: ["Label", "Email", "Password", "First Name"],
                },
                name: {
                    type: "string",
                    default: "field",
                    examples: ["field", "email", "password"],
                },
                type: {
                    type: "select",
                    default: "text",
                    options: ["text", "email", "password", "number"],
                },
                placeholder: {
                    type: "string",
                    default: "Enter value...",
                    examples: ["Enter value...", "Email address"],
                },
                value: {
                    type: "string",
                    default: "",
                    examples: ["", "Sample text", "user@example.com"],
                },
                required: { type: "boolean", default: false },
                error: {
                    type: "string",
                    default: "",
                    examples: ["", "This field is required"],
                },
            },
        },
        {
            id: "roleCard",
            name: "RoleCard",
            category: "molecules",
            component: RoleCard,
            description: "Card component for role selection",
            props: {
                title: {
                    type: "string",
                    default: "Role",
                    examples: ["Role", "Teacher", "Parent", "Student"],
                },
                icon: { type: "element", default: null },
            },
        },
        {
            id: "sidebarMenuItem",
            name: "SidebarMenuItem",
            category: "molecules",
            component: SidebarMenuItem,
            description: "Menu item for sidebar navigation",
            props: {
                label: {
                    type: "string",
                    default: "Menu Item",
                    examples: [
                        "Menu Item",
                        "Activities",
                        "Dashboard",
                        "Settings",
                    ],
                },
                icon: {
                    type: "select",
                    default: "activities",
                    options: ["activities", "circle", "checkCircle"],
                },
                count: {
                    type: "number",
                    default: null,
                    examples: [null, 0, 5, 12, 99],
                },
                isSelected: { type: "boolean", default: false },
                isHover: { type: "boolean", default: false },
                hasIcon: { type: "boolean", default: true },
            },
        },
        {
            id: "studentInfo",
            name: "StudentInfo",
            category: "molecules",
            component: StudentInfo,
            description: "Student avatar and name display component",
            props: {
                name: {
                    type: "string",
                    default: "Student Name",
                    examples: ["Alice Dupont", "Thomas Martin", "Sophie Bernard"],
                },
                avatar: {
                    type: "string",
                    default: "👤",
                    examples: ["👤", "👨", "👩", "🧑"],
                },
                avatarUrl: {
                    type: "string",
                    default: "",
                    examples: ["", "https://i.pravatar.cc/150?img=1"],
                },
            },
        },
        {
            id: "activityBreadcrumb",
            name: "ActivityBreadcrumb",
            category: "molecules",
            component: ActivityBreadcrumb,
            description: "Breadcrumb navigation for activities",
            props: {
                items: {
                    type: "array",
                    default: ["Addition et Soustraction", "Se présenter", "3+..."],
                    examples: [
                        ["Math", "Lesson 1"],
                        ["Addition et Soustraction", "Se présenter", "3+..."],
                    ],
                },
                separator: {
                    type: "string",
                    default: " / ",
                    examples: [" / ", " > ", " → "],
                },
            },
        },
        {
            id: "scoreBadge",
            name: "ScoreBadge",
            category: "molecules",
            component: ScoreBadge,
            description: "Score display with color-coded variants",
            props: {
                score: {
                    type: "number",
                    default: 14,
                    min: 0,
                    max: 20,
                },
                total: {
                    type: "number",
                    default: 20,
                    min: 1,
                    max: 100,
                },
                variant: {
                    type: "select",
                    default: "good",
                    options: ["good", "warning", "caution", "neutral"],
                },
            },
        },
    ],
    organisms: [
        {
            id: "loginForm",
            name: "LoginForm",
            category: "organisms",
            component: LoginForm,
            description: "Complete login form with validation",
            props: {
                onSubmit: {
                    type: "function",
                    default: (data) => console.log("Form submitted:", data),
                },
                isLoading: { type: "boolean", default: false },
            },
        },
        {
            id: "sideDropMenu",
            name: "SideDropMenu",
            category: "organisms",
            component: SideDropMenu,
            description: "Collapsible sidebar menu with items",
            props: {
                title: {
                    type: "string",
                    default: "Activités",
                    examples: ["Activités", "Dashboard", "Settings"],
                },
                isOpen: { type: "boolean", default: false },
                leadingIcon: {
                    type: "select",
                    default: "activities",
                    options: ["activities", "circle", "checkCircle"],
                },
                items: {
                    type: "array",
                    default: [
                        {
                            id: "1",
                            label: "Item 1",
                            icon: "circle",
                            count: 5,
                            isSelected: false,
                        },
                        {
                            id: "2",
                            label: "Item 2",
                            icon: "circle",
                            count: null,
                            isSelected: true,
                        },
                    ],
                },
            },
        },
        {
            id: "sideNav",
            name: "SideNav",
            category: "organisms",
            component: SideNav,
            description:
                "Full vertical navigation with expanded and collapsed variants",
            props: {
                state: {
                    type: "select",
                    default: "expanded",
                    options: ["expanded", "collapsed"],
                },
                user: {
                    type: "object",
                    default: {
                        name: "M. Dupont",
                        role: "Enseignant",
                        avatarUrl:
                            "https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713",
                    },
                },
                navItems: {
                    type: "array",
                    default: [
                        {
                            id: "students",
                            label: "Tableau d'Éleves",
                            icon: "users",
                            selected: true,
                        },
                        {
                            id: "messages",
                            label: "Mes messages",
                            icon: "messagesSquare",
                            count: 12,
                            countVariant: "alert",
                        },
                        {
                            id: "admin",
                            label: "Administration",
                            icon: "settings",
                        },
                    ],
                },
                activityItems: {
                    type: "array",
                    default: [
                        { id: "published", label: "Publiées", count: 0 },
                        { id: "drafts", label: "Brouillons", count: 0 },
                        { id: "scheduled", label: "Programmées", count: 0 },
                    ],
                },
                stats: {
                    type: "array",
                    default: [
                        {
                            id: "todayActivities",
                            title: "Activités du jour",
                            value: 16,
                            trend: "+11%",
                            trendTone: "positive",
                            icon: "taskSquare",
                        },
                        {
                            id: "userOfDay",
                            title: "Utilisateur du jour",
                            value: 56,
                            trend: "-2%",
                            trendTone: "negative",
                            icon: "taskSquare",
                        },
                        {
                            id: "parentMessages",
                            title: "Messages parent",
                            value: 205,
                            trend: "-11%",
                            trendTone: "warning",
                            icon: "taskSquare",
                        },
                        {
                            id: "studentAlerts",
                            title: "Alertes étudiantes",
                            value: 10,
                            trend: "-8%",
                            trendTone: "warning",
                            icon: "taskSquare",
                        },
                    ],
                },
            },
        },
        {
            id: "notesTableRow",
            name: "NotesTableRow",
            category: "organisms",
            component: NotesTableRow,
            description: "Complete table row for notes display with student info, activity, score, and status",
            props: {
                student: {
                    type: "object",
                    default: {
                        name: "Alice Dupont",
                        avatar: "👤",
                        avatarUrl: "",
                        activity: ["Addition et Soustraction", "Se présenter", "3+..."],
                        score: 14,
                        scoreTotal: 20,
                        scoreVariant: "good",
                        status: "Validé",
                        statusType: "success",
                        date: "01/12/2024",
                        time: "14:30",
                    },
                },
            },
        },
        {
            id: "notesFilterBar",
            name: "NotesFilterBar",
            category: "organisms",
            component: NotesFilterBar,
            description: "Filter bar with tabs and filter dropdowns for notes page",
            props: {
                tabs: {
                    type: "array",
                    default: [
                        { id: "all", label: "Toutes les notes", showIcon: true },
                        { id: "calculated", label: "Calculées", showIcon: false },
                        { id: "todo", label: "A faire", showIcon: false },
                        { id: "pending", label: "En attente", showIcon: false },
                    ],
                },
                activeTab: {
                    type: "string",
                    default: "all",
                },
                onTabChange: {
                    type: "function",
                    default: (tabId) => console.log("Tab changed:", tabId),
                },
                filters: {
                    type: "array",
                    default: [
                        { id: "class", label: "Classe(s)", onClick: () => console.log("Filter class") },
                        { id: "activity", label: "Type d'activités", onClick: () => console.log("Filter activity") },
                        { id: "diagnostic", label: "Diagnostic", onClick: () => console.log("Filter diagnostic") },
                    ],
                },
            },
        },
    ],
    pages: [
        {
            id: "notesPage",
            name: "Notes Page",
            category: "pages",
            component: NotesPage,
            description: "Complete notes overview page with filtering, table, and status tracking",
            props: {},
        },
    ],
};

// Helper function to get all components
export const getAllComponents = () => {
    return [
        ...componentLibrary.atoms,
        ...componentLibrary.molecules,
        ...componentLibrary.organisms,
        ...componentLibrary.pages,
    ];
};

// Helper function to get component by id
export const getComponentById = (id) => {
    const allComponents = getAllComponents();
    return allComponents.find((comp) => comp.id === id);
};
