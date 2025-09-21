import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "../layouts/AdminLayout";
import { useState } from "react";

export default function Settings() {
    const [generalSettings, setGeneralSettings] = useState({
        storeName: "Ceylon Gems",
        storeEmail: "contact@ceylongems.com",
        storePhone: "+94 11 123 4567",
        storeAddress: "123 Main Street, Colombo, Sri Lanka",
    });

    const [paymentSettings, setPaymentSettings] = useState({
        currency: "USD",
        paymentMethods: ["Credit Card", "PayPal", "Cash on Delivery"],
    });

    const [emailSettings, setEmailSettings] = useState({
        smtpServer: "smtp.example.com",
        smtpPort: "587",
        smtpUsername: "noreply@ceylongems.com",
        smtpPassword: "••••••••••••",
    });

    // Handle general settings change
    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGeneralSettings({
            ...generalSettings,
            [name]: value
        });
    };

    // Handle email settings change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmailSettings({
            ...emailSettings,
            [name]: value
        });
    };

    return (
        <AdminLayout title="Settings">
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">Settings</h1>

                {/* General Settings */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                            Configure your store's basic information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="storeName">Store Name</Label>
                                    <Input
                                        id="storeName"
                                        name="storeName"
                                        value={generalSettings.storeName}
                                        onChange={handleGeneralChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="storeEmail">Store Email</Label>
                                    <Input
                                        id="storeEmail"
                                        name="storeEmail"
                                        type="email"
                                        value={generalSettings.storeEmail}
                                        onChange={handleGeneralChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="storePhone">Store Phone</Label>
                                    <Input
                                        id="storePhone"
                                        name="storePhone"
                                        value={generalSettings.storePhone}
                                        onChange={handleGeneralChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="storeAddress">Store Address</Label>
                                    <Input
                                        id="storeAddress"
                                        name="storeAddress"
                                        value={generalSettings.storeAddress}
                                        onChange={handleGeneralChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button>Save General Settings</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Payment Settings */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Payment Settings</CardTitle>
                        <CardDescription>
                            Configure payment methods and options
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <select
                                    id="currency"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={paymentSettings.currency}
                                    onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="LKR">LKR - Sri Lankan Rupee</option>
                                    <option value="GBP">GBP - British Pound</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Payment Methods</Label>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="creditCard"
                                            checked={paymentSettings.paymentMethods.includes("Credit Card")}
                                            onChange={(e) => {
                                                const methods = e.target.checked
                                                    ? [...paymentSettings.paymentMethods, "Credit Card"]
                                                    : paymentSettings.paymentMethods.filter(m => m !== "Credit Card");
                                                setPaymentSettings({ ...paymentSettings, paymentMethods: methods });
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="creditCard">Credit Card</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="paypal"
                                            checked={paymentSettings.paymentMethods.includes("PayPal")}
                                            onChange={(e) => {
                                                const methods = e.target.checked
                                                    ? [...paymentSettings.paymentMethods, "PayPal"]
                                                    : paymentSettings.paymentMethods.filter(m => m !== "PayPal");
                                                setPaymentSettings({ ...paymentSettings, paymentMethods: methods });
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="paypal">PayPal</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="cod"
                                            checked={paymentSettings.paymentMethods.includes("Cash on Delivery")}
                                            onChange={(e) => {
                                                const methods = e.target.checked
                                                    ? [...paymentSettings.paymentMethods, "Cash on Delivery"]
                                                    : paymentSettings.paymentMethods.filter(m => m !== "Cash on Delivery");
                                                setPaymentSettings({ ...paymentSettings, paymentMethods: methods });
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="cod">Cash on Delivery</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="bankTransfer"
                                            checked={paymentSettings.paymentMethods.includes("Bank Transfer")}
                                            onChange={(e) => {
                                                const methods = e.target.checked
                                                    ? [...paymentSettings.paymentMethods, "Bank Transfer"]
                                                    : paymentSettings.paymentMethods.filter(m => m !== "Bank Transfer");
                                                setPaymentSettings({ ...paymentSettings, paymentMethods: methods });
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor="bankTransfer">Bank Transfer</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button>Save Payment Settings</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Email Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Email Settings</CardTitle>
                        <CardDescription>
                            Configure email server settings for notifications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="smtpServer">SMTP Server</Label>
                                    <Input
                                        id="smtpServer"
                                        name="smtpServer"
                                        value={emailSettings.smtpServer}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPort">SMTP Port</Label>
                                    <Input
                                        id="smtpPort"
                                        name="smtpPort"
                                        value={emailSettings.smtpPort}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                                    <Input
                                        id="smtpUsername"
                                        name="smtpUsername"
                                        value={emailSettings.smtpUsername}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                                    <Input
                                        id="smtpPassword"
                                        name="smtpPassword"
                                        type="password"
                                        value={emailSettings.smtpPassword}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button>Save Email Settings</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}