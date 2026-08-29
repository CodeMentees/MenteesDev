import React from "react";
import { Link } from "react-router-dom";

/**
 * BlogAuthModal - shown when an unauthenticated user tries to access blog content.
 * Displays a beautiful overlay modal asking the user to sign in.
 */
function BlogAuthModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative z-10 w-full max-w-md bg-[#0C172C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Top gradient bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 to-purple-600" />

                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-pink-500/20 flex items-center justify-center text-3xl">
                        🔒
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">
                        Sign In to Read Blogs
                    </h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Our blog content is exclusive to members. Sign in to unlock full
                        access to all articles, tutorials, and insights.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <Link
                            to="/login"
                            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg"
                            onClick={onClose}
                        >
                            Sign In to Continue →
                        </Link>
                        <Link
                            to="/register"
                            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-xl transition-all"
                            onClick={onClose}
                        >
                            Create a Free Account
                        </Link>
                    </div>

                    {/* Dismiss */}
                    <button
                        onClick={onClose}
                        className="mt-5 text-sm text-gray-600 hover:text-gray-400 transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BlogAuthModal;
