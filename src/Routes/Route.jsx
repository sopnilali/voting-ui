import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Homepage from '../Pages/HomePage/Homepage.jsx';
import Login from '../Pages/Login/Login.jsx';
import Register from '../Pages/Register/Register.jsx';
import MainLayout from '../Layouts/MainLayout.jsx';
import DashboardLayout from '../Components/DashboardLayout/index.jsx';
import DashboardStats from '../Components/DashboardLayout/Admin/Dashboard/index.jsx';
import ManageUser from '../Components/DashboardLayout/Admin/User/ManageUser.jsx';
import ManageVoter from '../Components/DashboardLayout/Admin/Voter/ManageVoter.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import ManageElection from '../Components/DashboardLayout/Admin/Election/ManageElection.jsx';
import ManageCandidates from '../Components/DashboardLayout/Admin/Candidates/ManageCandidates.jsx';
import ManageVoteCount from '../Components/DashboardLayout/Admin/VoteCount/ManageVoteCount.jsx';
import VoterRegisterForm from '../Components/DashboardLayout/User/VoterRegister/VoterRegisterForm.jsx';
import ElectionList from '../Components/DashboardLayout/User/ElectionList/ElectionList.jsx';
import CandidateList from '../Components/DashboardLayout/User/CandidateList/CandidateList.jsx';
import About from '../Pages/About/About.jsx';
import Services from '../Pages/Services/Services.jsx';
import Contact from '../Pages/Contact/Contact.jsx';

const router = createBrowserRouter([
    // public main layout
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/contact',
                element: <Contact />
            }
        ]
    },

    // common routes
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },

    // shared dashboard layout for both admin and user
    {
        element: <DashboardLayout />,
        children: [
            // Common dashboard routes accessible by both roles
            {
                path: '/dashboard',
                element: <ProtectedRoutes roles={["ADMIN", "USER"]}>
                    <DashboardStats />
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/profile',
                element: <ProtectedRoutes roles={["ADMIN", "USER"]}>
                    <h2>Profile Management</h2>
                </ProtectedRoutes>
            },

            // Admin-only routes
            {
                path: '/dashboard/admin/users',
                element: <ProtectedRoutes role="ADMIN">
                    <ManageUser />
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/admin/voters',
                element: <ProtectedRoutes role="ADMIN">
                    <ManageVoter />
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/admin/candidates',
                element: <ProtectedRoutes role="ADMIN">
                    <ManageCandidates />
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/admin/elections',
                element: <ProtectedRoutes role="ADMIN">
                    <ManageElection />
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/admin/voting-count',
                element: <ProtectedRoutes role="ADMIN">
                    <ManageVoteCount />
                </ProtectedRoutes>
            },

            // User-only routes
            {
                path: '/dashboard/overview',
                element: <ProtectedRoutes role="USER">
                    <h2>Overview</h2>
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/voting-history',
                element: <ProtectedRoutes role="USER">
                    <h2>Voting History</h2>
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/election-list',
                element: <ProtectedRoutes role="USER">
                    <ElectionList />
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/elections/:id',
                element: <ProtectedRoutes role="USER">
                    <CandidateList />
                </ProtectedRoutes>
            },
            {
                path: '/dashboard/voter-registration',
                element: <ProtectedRoutes role="USER">
                    <VoterRegisterForm/>
                </ProtectedRoutes>
            }
        ]
    }
])

export default router;