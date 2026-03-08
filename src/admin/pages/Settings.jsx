import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Mail, Phone, MapPin, Github, Linkedin, Twitter, FileText, Plus, Trash2 } from 'lucide-react';
import { getSettings, updateSettings } from '../../services/api';
import ImageUpload from '../components/ImageUpload';

const Settings = () => {
    const [settings, setSettings] = useState({
        resumeUrl: '',
        contactEmail: '',
        contactPhone: '',
        location: '',
        socialLinks: [],
        aboutShortcut: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const data = await getSettings();
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setMessage({ type: 'error', text: 'Failed to load settings' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await updateSettings(settings);
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setSaving(false);
        }
    };

    const addSocialLink = () => {
        setSettings({
            ...settings,
            socialLinks: [...settings.socialLinks, { platform: 'Github', url: '', label: '' }]
        });
    };

    const removeSocialLink = (index) => {
        const newLinks = [...settings.socialLinks];
        newLinks.splice(index, 1);
        setSettings({ ...settings, socialLinks: newLinks });
    };

    const updateSocialLink = (index, field, value) => {
        const newLinks = [...settings.socialLinks];
        newLinks[index][field] = value;
        setSettings({ ...settings, socialLinks: newLinks });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">General Settings</h1>
                    <p className="text-gray-400 mt-1">Manage global site information and social links</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-6">
                {/* Contact Information */}
                <section className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                        <Globe className="text-cyan-400" size={20} />
                        <h2 className="text-xl font-semibold text-white">Contact Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Display Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    placeholder="yourname@gmail.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    value={settings.contactPhone}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    value={settings.location}
                                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    placeholder="City, State, Country"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">About Shortcut (Tagline)</label>
                            <input
                                type="text"
                                value={settings.aboutShortcut}
                                onChange={(e) => setSettings({ ...settings, aboutShortcut: e.target.value })}
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                                placeholder="Full Stack Developer / UI Designer"
                            />
                        </div>
                    </div>
                </section>

                {/* Resume Upload */}
                <section className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                        <FileText className="text-cyan-400" size={20} />
                        <h2 className="text-xl font-semibold text-white">Resume Management</h2>
                    </div>
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-400">Upload New Resume (PDF)</label>
                        <ImageUpload
                            currentImage={settings.resumeUrl}
                            onUploadSuccess={(url) => setSettings({ ...settings, resumeUrl: url })}
                            isDocument={true}
                            label="Resume File"
                        />
                        {settings.resumeUrl && (
                            <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-white/5 flex items-center justify-between">
                                <span className="text-sm text-gray-400 truncate max-w-[70%]">{settings.resumeUrl}</span>
                                <a
                                    href={settings.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                >
                                    View Resume
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                {/* Social Links */}
                <section className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2">
                            <Github className="text-cyan-400" size={20} />
                            <h2 className="text-xl font-semibold text-white">Social Links</h2>
                        </div>
                        <button
                            onClick={addSocialLink}
                            className="text-cyan-400 hover:text-cyan-300 p-1 transition-colors"
                        >
                            <Plus size={24} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {settings.socialLinks.map((link, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-800/30 border border-white/5 rounded-xl">
                                <div className="sm:w-1/4">
                                    <select
                                        value={link.platform}
                                        onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500/50"
                                    >
                                        <option value="Github">GitHub</option>
                                        <option value="Linkedin">LinkedIn</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="Mail">Email</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="sm:w-1/4">
                                    <input
                                        type="text"
                                        placeholder="Label (e.g. GitHub)"
                                        value={link.label}
                                        onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                                <button
                                    onClick={() => removeSocialLink(index)}
                                    className="text-red-400 hover:text-red-300 self-center p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        {settings.socialLinks.length === 0 && (
                            <p className="text-center text-gray-500 italic py-4">No social links added yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
