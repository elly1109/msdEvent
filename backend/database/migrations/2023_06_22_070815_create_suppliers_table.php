<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->enum('gender',['Male', 'Female'])->nullable();
            $table->string('companyName');
            $table->string('title');
            $table->enum('prefix',['Prof.','Dr.', 'Mr.', 'Mrs.', 'Ms.','Rev.','Sir','Madam'])->nullable();
            $table->enum('suffix',['PhD','Jnr.','Snr.'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
