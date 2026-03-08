import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '../services/api';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const data = await getSettings();
                setSettings(data);
            } catch (err) {
                console.error('Error fetching settings:', err);
                setError('Failed to load site settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, error }}>
            {children}
        </SettingsContext.Provider>
    );
};
