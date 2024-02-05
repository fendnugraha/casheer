<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Journal;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    public function index()
    {

        return Inertia::render('Journals/Index', [
            'title' => 'Journals',
            'description' => 'Journals List',
            'journals' => Journal::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Journals/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'date_issued' => 'required',
            'invoice' => 'required',
            'description' => 'required',
            'debt_code' => 'required',
            'cred_code' => 'required',
            'amount' => 'required',
            'user_id' => 'required',
            'warehouse_id' => 'required',
        ]);
        $journal = new Journal();
        $journal->date_issued = $request->date_issued;
        $journal->invoice = $request->invoice;
        $journal->description = $request->description;
        $journal->debt_code = $request->debt_code;
        $journal->cred_code = $request->cred_code;
        $journal->amount = $request->amount;
        $journal->user_id = $request->user_id;
        $journal->warehouse_id = $request->warehouse_id;
        $journal->save();
        return redirect()->route('journals.index');
    }

    public function edit($id)
    {
        $journal = Journal::find($id);
        return Inertia::render('Journals/Edit', [
            'journal' => $journal
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'date_issued' => 'required',
            'invoice' => 'required',
            'description' => 'required',
            'debt_code' => 'required',
            'cred_code' => 'required',
            'amount' => 'required',
            'user_id' => 'required',
            'warehouse_id' => 'required',
        ]);
        $journal = Journal::find($id);
        $journal->date_issued = $request->date_issued;
        $journal->invoice = $request->invoice;
        $journal->description = $request->description;
        $journal->debt_code = $request->debt_code;
        $journal->cred_code = $request->cred_code;
        $journal->amount = $request->amount;
        $journal->user_id = $request->user_id;
        $journal->warehouse_id = $request->warehouse_id;
        $journal->save();
        return redirect()->route('journals.index');
    }

    public function destroy($id)
    {
        $journal = Journal::find($id);
        $journal->delete();
        return redirect()->route('journals.index');
    }
}
