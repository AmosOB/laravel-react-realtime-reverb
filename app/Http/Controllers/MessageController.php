<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function userDisplay()
    {
        $AuthUser = Auth::user();
        $users = User::select('id', 'name')->where('id', '<>', $AuthUser->id)->get();

        return response()->json([
            'users' => $users,
            'authUser' => $AuthUser
        ]);
    }

    public function sendMessage(Request $request)
    {
        $data = $request->validate([
            'message' => 'required',
            'recipient_id' => 'required|exists:users,id'
        ]);

        $senderId = auth()->id();

        $message = Message::create([
            'message' => $data['message'],
            'sender_id' => $senderId,
            'recipient_id' => $data['recipient_id']
        ]);

        broadcast(new MessageSent($message));

        return response()->json([
            'success' => 'Message Sent'
        ]);
    }

    public function messageDisplay($recipientId)
    {
        $currentUser = Auth::user();
        $recipientUser = User::findOrFail($recipientId);

        // $users = User::with('messages')->where('id', '<>', $currentUser->id)->get();

        $messages = Message::with(['sender:id,name', 'recipient:id,name'])
            ->where(function ($query) use ($currentUser, $recipientUser) {
                $query->where('sender_id', $currentUser->id)
                    ->where('recipient_id', $recipientUser->id);
            })->orWhere(function ($query) use ($currentUser, $recipientUser) {
                $query->where('sender_id', $recipientUser->id)
                    ->where('recipient_id', $currentUser->id);
            })->orderBy('created_at')->get();

        foreach ($messages as $message) {
            if ($message->recipient_id === $currentUser->id && !$message->is_read) {
                $message->update(['is_read' => true]);
            }
        }

        return response()->json([
            'messages' => $messages,
            'recipientId' => $recipientId,
            'currentUser' => $currentUser->id
        ]);
    }
}
