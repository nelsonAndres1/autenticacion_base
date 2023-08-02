<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('tipdoc');
            $table->string('docemp')->unique();
            $table->string('prinom');
            $table->string('segnom');
            $table->string('priape');
            $table->string('segape');
            $table->string('painac');
            $table->string('fecnac',11);
            $table->string('codsex',1);
            $table->string('pais');
            $table->string('ciudad');
            $table->string('direccion');
            $table->string('email')->unique();
            $table->string('ocupacion');
            $table->string('empresa');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
